function jsonReporter(report) {
  const results = [];

  report.testResults.forEach((testCase) => {
    testCase.testResults.forEach((result) => {
      results.push({
        description: result.title,
        success: result.status === 'passed',
        suite: result.ancestorTitles,
        time: result.duration,
      });
    });
  });

  const ciReport = {
    result: {
      jest: results,
    },
    summary: {
      success: report.numPassedTestSuites,
      failed: report.numFailedTestSuites,
    },
  };

  if (ciReport.summary.failed) {
    console.error(JSON.stringify(ciReport));
  } else {
    console.log(JSON.stringify(ciReport));
  }

  return report;
}

module.exports = jsonReporter;
