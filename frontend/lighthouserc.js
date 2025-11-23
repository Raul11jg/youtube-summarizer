module.exports = {
  ci: {
    collect: {
      startServerCommand: "npx next start -p 3001",
      url: ["http://localhost:3001"],
      numberOfRuns: 3,
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "categories:performance": ["warn", { minScore: 0.7 }],
        "categories:accessibility": ["warn", { minScore: 0.9 }],
      },
    },
  },
};
