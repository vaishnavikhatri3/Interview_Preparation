import { b as ensure_array_like, a as attr_class, e as escape_html, c as attr } from "../../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
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
    $$renderer2.push(`<div class="start-interview"><div class="page-description svelte-mcucib"><p class="svelte-mcucib">Choose a topic, difficulty level, and number of questions to begin your AI-powered mock interview. You'll receive real-time feedback and a detailed performance report.</p></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="card svelte-mcucib"><h2 class="svelte-mcucib">Select Topic</h2> <div class="topic-grid svelte-mcucib"><!--[-->`);
    const each_array = ensure_array_like(topics);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let topic = each_array[$$index];
      $$renderer2.push(`<button${attr_class("topic-chip svelte-mcucib", void 0, { "selected": selectedTopic === topic })}>${escape_html(topic)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="card svelte-mcucib"><h2 class="svelte-mcucib">Difficulty Level</h2> <div class="difficulty-grid svelte-mcucib"><!--[-->`);
    const each_array_1 = ensure_array_like(difficulties);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let d = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class("difficulty-card svelte-mcucib", void 0, { "selected": difficulty === d.value })}><span class="diff-label svelte-mcucib">${escape_html(d.label)}</span> <span class="diff-desc svelte-mcucib">${escape_html(d.desc)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="card svelte-mcucib"><h2 class="svelte-mcucib">Number of Questions</h2> <div class="count-grid svelte-mcucib"><!--[-->`);
    const each_array_2 = ensure_array_like(countOptions);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let count = each_array_2[$$index_2];
      $$renderer2.push(`<button${attr_class("count-chip svelte-mcucib", void 0, { "selected": questionCount === count })}>${escape_html(count)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <button class="start-btn svelte-mcucib"${attr("disabled", !selectedTopic, true)}>`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Start Interview`);
    }
    $$renderer2.push(`<!--]--></button></div>`);
  });
}
export {
  _page as default
};
