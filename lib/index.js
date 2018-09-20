"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function () {
    return {
        noColors: true,
        currentFixture: null,
        fixtureDurationMs: 0,

        report: {
            startTime: null,
            endTime: null,
            userAgents: null,
            total: 0,
            skipped: 0,
            run: 0,
            passed: 0,
            failed: 0,
            fixtures: [],
            warnings: []
        },

        reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
            this.report.startTime = this.moment(startTime).format('YYYY-MM-DD HH:mm:ss:SSS');
            this.report.userAgents = userAgents;
            this.report.run = testCount;
        },

        reportFixtureStart: function reportFixtureStart(name, path) {
            this.currentFixture = { name: name, path: path, duration: [], tests: [] };
            this.report.fixtures.push(this.currentFixture);
            this.fixtureDurationMs = 0;
        },

        reportTestDone: function reportTestDone(name, testRunInfo) {
            var _this = this;

            var errs = testRunInfo.errs.map(function (err) {
                return _this.formatError(err);
            });

            if (testRunInfo.skipped) this.report.skipped++;

            this.currentFixture.tests.push({
                name: name,
                errs: errs,
                durationMs: testRunInfo.durationMs,
                unstable: testRunInfo.unstable,
                screenshotPath: testRunInfo.screenshotPath,
                skipped: testRunInfo.skipped
            });

            this.fixtureDurationMs += testRunInfo.durationMs;
            this.currentFixture.duration.splice(0, 1, {
                Ms: this.fixtureDurationMs,
                s: this.fixtureDurationMs/1000.0
            });
        },

        reportTaskDone: function reportTaskDone(endTime, passed, warnings) {
            /*if (this.lastSuiteName) {
                this.currentFixture.duration.push({
                    Ms: this.fixtureDurationMs,
                    s: this.fixtureDurationMs/1000.0
                });
                this.fixtureDurationMs = 0;
            }*/

            this.report.passed = passed;
            this.report.total = this.report.skipped + this.report.run;
            this.report.failed = this.report.run - passed;
            this.report.endTime = this.moment(endTime).format('YYYY-MM-DD HH:mm:ss:SSS');
            this.report.warnings = warnings;

            this.write(JSON.stringify(this.report, null, 2));
        }
    };
};

module.exports = exports["default"];