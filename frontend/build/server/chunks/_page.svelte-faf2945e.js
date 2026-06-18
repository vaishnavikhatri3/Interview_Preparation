import { c as create_ssr_component, b as each, e as escape } from './index2-b5666d43.js';

const dummyQuestions = {
  "Data Structures & Algorithms": [
    { id: "1", question: "Explain the difference between an array and a linked list. When would you use one over the other?", category: "Data Structures & Algorithms", difficulty: "easy" },
    { id: "2", question: "Implement a function to detect if a linked list has a cycle.", category: "Data Structures & Algorithms", difficulty: "medium" },
    { id: "3", question: "What is the time complexity of binary search? Explain how it works.", category: "Data Structures & Algorithms", difficulty: "easy" },
    { id: "4", question: "Design a Least Recently Used (LRU) cache. Discuss the data structures you would use and the trade-offs.", category: "Data Structures & Algorithms", difficulty: "hard" },
    { id: "5", question: "Explain how a hash table works. How do you handle collisions?", category: "Data Structures & Algorithms", difficulty: "medium" }
  ],
  "System Design": [
    { id: "6", question: "Design a URL shortening service like TinyURL. Discuss the database schema, API design, and scaling considerations.", category: "System Design", difficulty: "hard" },
    { id: "7", question: "How would you design a real-time chat application? What protocols and architecture would you use?", category: "System Design", difficulty: "medium" },
    { id: "8", question: "Explain the difference between horizontal and vertical scaling. When would you use each?", category: "System Design", difficulty: "easy" },
    { id: "9", question: "Design a distributed key-value store. Discuss consistency, partitioning, and replication strategies.", category: "System Design", difficulty: "hard" },
    { id: "10", question: "Design a rate limiter for a public API. Discuss the algorithms and distributed considerations.", category: "System Design", difficulty: "medium" }
  ],
  "Frontend Development": [
    { id: "11", question: "Explain the concept of the virtual DOM and how it improves performance in frameworks like React.", category: "Frontend Development", difficulty: "medium" },
    { id: "12", question: "What is the difference between cookies, localStorage, and sessionStorage? When should you use each?", category: "Frontend Development", difficulty: "easy" },
    { id: "13", question: "Explain CSS specificity and how the cascade works. Give an example of a specificity conflict.", category: "Frontend Development", difficulty: "medium" },
    { id: "14", question: "How would you optimize a web application for performance? List at least 5 techniques.", category: "Frontend Development", difficulty: "easy" },
    { id: "15", question: "Explain the concept of closures in JavaScript with a practical example.", category: "Frontend Development", difficulty: "medium" }
  ],
  "Backend Development": [
    { id: "16", question: "Explain RESTful API design principles. What are the key HTTP methods and their use cases?", category: "Backend Development", difficulty: "easy" },
    { id: "17", question: "What is database indexing and how does it improve query performance? What are the trade-offs?", category: "Backend Development", difficulty: "medium" },
    { id: "18", question: "Explain the CAP theorem. How does it apply to distributed database design?", category: "Backend Development", difficulty: "hard" },
    { id: "19", question: "What is the difference between authentication and authorization? How would you implement JWT-based auth?", category: "Backend Development", difficulty: "medium" },
    { id: "20", question: "Explain how you would handle race conditions in a concurrent application.", category: "Backend Development", difficulty: "hard" }
  ],
  "Database Design": [
    { id: "21", question: "Explain the difference between SQL and NoSQL databases. When would you use each?", category: "Database Design", difficulty: "easy" },
    { id: "22", question: "Design a database schema for a social media platform with users, posts, comments, and likes.", category: "Database Design", difficulty: "medium" },
    { id: "23", question: "What is normalization and denormalization? Explain the different normal forms.", category: "Database Design", difficulty: "medium" },
    { id: "24", question: "How would you optimize a slow database query? Discuss EXPLAIN plans, indexing strategies, and query rewriting.", category: "Database Design", difficulty: "hard" },
    { id: "25", question: "What is ACID in database transactions? Explain each property with examples.", category: "Database Design", difficulty: "easy" }
  ],
  "Behavioral Questions": [
    { id: "26", question: "Tell me about a time you had a conflict with a teammate. How did you resolve it?", category: "Behavioral Questions", difficulty: "easy" },
    { id: "27", question: "Describe a project you led. What was your approach to project management and how did you ensure success?", category: "Behavioral Questions", difficulty: "medium" },
    { id: "28", question: "Tell me about a time you failed. What did you learn from the experience?", category: "Behavioral Questions", difficulty: "easy" },
    { id: "29", question: "How do you stay updated with the latest technology trends? Give an example of a new technology you learned recently.", category: "Behavioral Questions", difficulty: "easy" },
    { id: "30", question: "Describe a situation where you had to make a difficult technical decision with limited information.", category: "Behavioral Questions", difficulty: "medium" }
  ],
  "Object-Oriented Design": [
    { id: "31", question: "Explain the four pillars of object-oriented programming with examples.", category: "Object-Oriented Design", difficulty: "easy" },
    { id: "32", question: "What is the difference between composition and inheritance? When would you prefer one over the other?", category: "Object-Oriented Design", difficulty: "medium" },
    { id: "33", question: "Design a parking lot system using OOP principles. Discuss the class hierarchy and relationships.", category: "Object-Oriented Design", difficulty: "hard" },
    { id: "34", question: "Explain the SOLID principles. Give an example of a violation and how to fix it.", category: "Object-Oriented Design", difficulty: "medium" },
    { id: "35", question: "What is a design pattern? Explain the factory pattern and give a real-world use case.", category: "Object-Oriented Design", difficulty: "medium" }
  ],
  "Operating Systems": [
    { id: "36", question: "Explain the difference between a process and a thread. What are the advantages of multithreading?", category: "Operating Systems", difficulty: "easy" },
    { id: "37", question: "What is a deadlock? What are the four necessary conditions for a deadlock to occur?", category: "Operating Systems", difficulty: "medium" },
    { id: "38", question: "Explain virtual memory and paging. How does an MMU translate virtual addresses to physical addresses?", category: "Operating Systems", difficulty: "hard" },
    { id: "39", question: "What is the difference between preemptive and non-preemptive scheduling? Give examples of each.", category: "Operating Systems", difficulty: "medium" },
    { id: "40", question: "Explain the producer-consumer problem and how semaphores can solve it.", category: "Operating Systems", difficulty: "hard" }
  ]
};
const defaultTopics = Object.keys(dummyQuestions);
function getDefaultTopics() {
  return defaultTopics;
}
const css = {
  code: ".page-description.svelte-vf1xqe.svelte-vf1xqe{margin-bottom:1.5rem}.page-description.svelte-vf1xqe p.svelte-vf1xqe{color:#64748b;font-size:0.95rem;line-height:1.6;margin:0}.error-banner.svelte-vf1xqe.svelte-vf1xqe{background:#fef2f2;color:#b91c1c;padding:0.85rem 1.25rem;border-radius:10px;margin-bottom:1.5rem;font-size:0.9rem}.card.svelte-vf1xqe.svelte-vf1xqe{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:1.5rem;margin-bottom:1.25rem}.card.svelte-vf1xqe h2.svelte-vf1xqe{margin:0 0 1rem;font-size:1rem;font-weight:600;color:#0f172a}.topic-grid.svelte-vf1xqe.svelte-vf1xqe{display:flex;flex-wrap:wrap;gap:0.6rem}.topic-chip.svelte-vf1xqe.svelte-vf1xqe{padding:0.6rem 1.1rem;border:1.5px solid #e2e8f0;border-radius:30px;background:#fff;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;transition:all 0.2s ease;font-family:inherit}.topic-chip.svelte-vf1xqe.svelte-vf1xqe:hover{border-color:#6366f1;color:#6366f1;background:#f8f7ff}.topic-chip.selected.svelte-vf1xqe.svelte-vf1xqe{background:#6366f1;color:#fff;border-color:#6366f1}.difficulty-grid.svelte-vf1xqe.svelte-vf1xqe{display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:0.75rem}.difficulty-card.svelte-vf1xqe.svelte-vf1xqe{display:flex;flex-direction:column;gap:0.3rem;padding:1rem 1.25rem;border:1.5px solid #e2e8f0;border-radius:12px;background:#fff;cursor:pointer;transition:all 0.2s ease;text-align:left;font-family:inherit}.difficulty-card.svelte-vf1xqe.svelte-vf1xqe:hover{border-color:#6366f1}.difficulty-card.selected.svelte-vf1xqe.svelte-vf1xqe{border-color:#6366f1;background:#f8f7ff}.difficulty-card.selected.svelte-vf1xqe .diff-label.svelte-vf1xqe{color:#6366f1}.diff-label.svelte-vf1xqe.svelte-vf1xqe{font-weight:600;font-size:0.95rem;color:#0f172a;text-transform:capitalize}.diff-desc.svelte-vf1xqe.svelte-vf1xqe{font-size:0.8rem;color:#64748b}.count-grid.svelte-vf1xqe.svelte-vf1xqe{display:flex;gap:0.75rem}.count-chip.svelte-vf1xqe.svelte-vf1xqe{width:56px;height:56px;border:1.5px solid #e2e8f0;border-radius:12px;background:#fff;color:#475569;font-size:1.15rem;font-weight:600;cursor:pointer;transition:all 0.2s ease;font-family:inherit;display:flex;align-items:center;justify-content:center}.count-chip.svelte-vf1xqe.svelte-vf1xqe:hover{border-color:#6366f1;color:#6366f1}.count-chip.selected.svelte-vf1xqe.svelte-vf1xqe{background:#6366f1;color:#fff;border-color:#6366f1}.start-btn.svelte-vf1xqe.svelte-vf1xqe{display:flex;align-items:center;justify-content:center;gap:0.6rem;width:100%;padding:1rem;border:none;border-radius:12px;background:linear-gradient(135deg, #6366f1, #2563eb);color:#fff;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.2s ease;font-family:inherit;margin-top:0.5rem}.start-btn.svelte-vf1xqe.svelte-vf1xqe:hover:not(:disabled){box-shadow:0 4px 20px rgba(99, 102, 241, 0.35);transform:translateY(-1px)}.start-btn.svelte-vf1xqe.svelte-vf1xqe:disabled{opacity:0.5;cursor:not-allowed}.btn-spinner.svelte-vf1xqe.svelte-vf1xqe{width:18px;height:18px;border:2px solid rgba(255, 255, 255, 0.3);border-top:2px solid #fff;border-radius:50%;animation:svelte-vf1xqe-spin 0.6s linear infinite}@keyframes svelte-vf1xqe-spin{to{transform:rotate(360deg)}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedTopic = "";
  let difficulty = "medium";
  let questionCount = 3;
  const topics = getDefaultTopics();
  const difficulties = [
    {
      value: "all",
      label: "All Levels",
      desc: "Mix of easy, medium, and hard"
    },
    {
      value: "easy",
      label: "Easy",
      desc: "Basic concepts and fundamentals"
    },
    {
      value: "medium",
      label: "Medium",
      desc: "Intermediate problem solving"
    },
    {
      value: "hard",
      label: "Hard",
      desc: "Complex scenarios and depth"
    }
  ];
  const countOptions = [1, 2, 3, 5];
  $$result.css.add(css);
  return `<div class="start-interview"><div class="page-description svelte-vf1xqe"><p class="svelte-vf1xqe">Choose a topic, difficulty level, and number of questions to begin your AI-powered mock interview. You&#39;ll receive real-time feedback and a detailed performance report.</p></div>

  ${``}

  <div class="card svelte-vf1xqe"><h2 class="svelte-vf1xqe">Select Topic</h2>
    <div class="topic-grid svelte-vf1xqe">${each(topics, (topic) => {
    return `<button class="${["topic-chip svelte-vf1xqe", selectedTopic === topic ? "selected" : ""].join(" ").trim()}">${escape(topic)}
        </button>`;
  })}</div></div>

  <div class="card svelte-vf1xqe"><h2 class="svelte-vf1xqe">Difficulty Level</h2>
    <div class="difficulty-grid svelte-vf1xqe">${each(difficulties, (d) => {
    return `<button class="${["difficulty-card svelte-vf1xqe", difficulty === d.value ? "selected" : ""].join(" ").trim()}"><span class="diff-label svelte-vf1xqe">${escape(d.label)}</span>
          <span class="diff-desc svelte-vf1xqe">${escape(d.desc)}</span>
        </button>`;
  })}</div></div>

  <div class="card svelte-vf1xqe"><h2 class="svelte-vf1xqe">Number of Questions</h2>
    <div class="count-grid svelte-vf1xqe">${each(countOptions, (count) => {
    return `<button class="${["count-chip svelte-vf1xqe", questionCount === count ? "selected" : ""].join(" ").trim()}">${escape(count)}
        </button>`;
  })}</div></div>

  <button class="start-btn svelte-vf1xqe" ${"disabled"}>${`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      Start Interview`}</button>
</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-faf2945e.js.map
