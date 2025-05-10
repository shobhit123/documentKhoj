export const fetchMockData = async () => {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            source: "Tech Blog",
            tags: ["AI", "Machine Learning"],
            topic: "Deep Learning",
            subTopic: "Neural Networks",
          },
          {
            id: 2,
            source: "Science Daily",
            tags: ["Biology", "Genetics"],
            topic: "CRISPR",
            subTopic: "Gene Editing",
          },
          {
            id: 3,
            source: "Finance Weekly",
            tags: ["Stocks", "Market Trends"],
            topic: "Stock Market",
            subTopic: "Investment Strategies",
          },
          {
            id: 4,
            source: "Health News",
            tags: ["Nutrition", "Wellness"],
            topic: "Healthy Eating",
            subTopic: "Superfoods",
          },
          {
            id: 5,
            source: "Tech World",
            tags: ["Cloud", "DevOps"],
            topic: "Cloud Computing",
            subTopic: "Kubernetes",
          },
          {
            id: 6,
            source: "Tech World",
            tags: ["Cloud", "DevOps"],
            topic: "Cloud Computing",
            subTopic: "Kubernetes",
          },
        ]);
      }, 1000);
    });
  };
  