# AI Disclosure

## Tool Used

Claude (Anthropic) - conversational AI assistant.

## How It Was Used

Claude was used as a **pair programming partner** with clearly defined boundaries. I drove all decisions and wrote all implementation logic. Claude assisted with planning, boilerplate generation, and code review.

### The Boundaries

Before writing any code, I defined what Claude would and would not do on this project:

**Claude did:**

- Help me plan the architecture and talk through trade-offs before I started building
- Challenge my decisions and flag things I had not considered
- Suggest options I had not thought of when I brought my own ideas to the table
- Generate boilerplate: file scaffolding, component skeletons, type interfaces, hook structures, CSS module files
- Review code I had written, identify bugs, and explain why they were wrong so I could fix them
- Help me reason through problems when I was stuck

**Claude did not:**

- Write implementation logic. The search filter, pagination maths, data mapping function, and all other logic where the thinking matters was mine.
- Make decisions unilaterally. Decision-making was collaborative: I proposed options, Claude proposed additional ones I had not considered, we discussed the trade-offs, and I made the final call.

**On bug fixing:** Claude identified bugs during code review and explained what was wrong and why. I applied the fixes. Same dynamic as a colleague reviewing a PR.

**The line:** Boilerplate is mechanical. Implementation is where the thinking lives. If I cannot explain a piece of code line by line in an interview, it should not be in the codebase.

### Planning Phase

Before writing any code, I used Claude to:

1. **Analyse the brief and data source** - discussed the JSON structure, identified the four required fields and their nested paths, and talked through the data mapping approach.

2. **Architectural decisions** - this was a collaborative, iterative conversation. My initial instinct was frontend-only. Claude pointed out that this is a full stack role. I then proposed three backend approaches and we discussed the trade-offs of each. I chose build-time static generation because the data is static and a live API is not warranted for this data profile.

3. **Feature scoping** - I suggested adding search, sort, and pagination beyond the brief. Claude helped me evaluate which features were worth the time investment and where to put the logic.

4. **State management** - I initially wanted Redux, Claude challenged whether the problem justified it. I suggested useReducer as a middle ground. I later questioned whether even that was necessary. We landed on useState. The decision evolved through genuine back-and-forth.

5. **CSS approach** - I proposed reusing design tokens from my portfolio site. Claude suggested alternatives which I evaluated and rejected.

6. **Decision documentation** - used the planning conversation to write an Architecture Decision Record log.

### Build Phase

During implementation, Claude was used for:

- **Boilerplate generation** - component file scaffolding, type interface structures, hook skeletons, CSS module files.
- **Code review and bug identification** - after writing implementation logic, I shared the code for review. Claude flagged bugs and explained why they were wrong. I understood the explanations and applied the fixes.
- **Rubber-ducking** - when stuck on an approach, I talked through the problem with Claude to clarify my thinking.
- **Edge case identification** - Claude helped identify scenarios I had not considered (e.g. datasets with missing fields, page state becoming invalid after search narrows results).

## Interaction Log

| Phase | What I Asked | What Claude Did | What I Did |
|-------|-------------|-----------------|------------|
| Planning | "Here's the brief - let's plan the stack and approach" | Helped analyse the data source, suggested architecture options | Chose React + Vite + TS to match job spec |
| Planning | "This JD is for a full stack role..." | Explained three backend options with trade-offs | Identified cold-start problem with free hosting. Proposed build-time generation |
| Planning | "Where should search/sort/pagination logic live?" | Presented three options with trade-offs | Chose to keep it in the component: one page, no need to extract |
| Planning | "I want Redux for state management" | Challenged whether the problem justified Redux | Proposed useReducer as middle ground. Later questioned that too. Landed on useState. |
| Build | "Is useReducer necessary for pagination?" | Agreed it was not. Challenged the earlier plan. | Decided on useState: simpler, one coordination line, easier to explain |
| Build | "Check my DatasetIndex component" | Identified four bugs: hooks outside component, missing imports, no return in useMemo, rendering full array instead of paginated slice | Understood each issue and applied the fixes |
| Build | "I want prev/next above and below the cards" | Suggested extracting a reusable Pagination component | Agreed: render it twice, write it once |
| Build | "I want a dropdown for page selection" | Generated Pagination component boilerplate (JSX + CSS) | Reviewed and integrated. Pagination logic was already written by me |
