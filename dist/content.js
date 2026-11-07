/* Public-safe project registry. Add a cover and set public: true only after approval. */
window.PORTFOLIO = {
  projects: {
    "ipd-journey": { id: "ipd-journey", slug: "integrated-product-design", milestone: "ipd", title: "Logitech — Coming soon", source: "Logitech", type: "Master's project", summary: "A confidential master's project in collaboration with Logitech. The case will be shared after its release.", year: "2026—2027", cover: null, logo: "logitech-logo.png", public: false, status: "Coming soon" },
    "frame-the-waiting": { id: "frame-the-waiting", slug: "frame-the-waiting", milestone: "dfi", title: "Frame the waiting", source: "TU Delft · Dare 2 Design Studio", type: "Interactive experience", summary: "A sensor-based installation that brings a small moment of connection to a physiotherapy waiting room.", year: "2026", cover: "frame-the-waiting-cover.png", public: true },
    "apex-seat": { id: "apex-seat", slug: "apex-seat", milestone: "ipd", title: "Apex Seat", source: "TU Delft · Computational Design", type: "Team project", summary: "A parametric car-seat concept for safer high-performance driving, combining adaptable geometry with 3D-printed lattice structures.", year: "Year 1 · Q4", cover: "apex-seat-cover.png", public: true },
    "grabable": { id: "grabable", slug: "grabable", milestone: "ipd-bsc", title: "Grabable", source: "University of Bologna · Montecatone Rehabilitation Institute", type: "Graduation project", summary: "An adjustable hand exoskeleton developed to support grasping for people with hand paralysis after a spinal stroke.", year: "2023", cover: "grabable-cover.png", public: true },
    "easyfelt-rd": { id: "easyfelt-rd", slug: "easyfelt", milestone: "easyfelt", title: "Case in development", source: "EASYfelt", type: "R&D work", summary: "A public-safe case is in preparation. Confidential development work remains private.", year: "2024—present", cover: null, public: false },
    "3d-next-level": { id: "3d-next-level", slug: "3d-next-level", milestone: "3d-next-level", title: "Case in development", source: "3D Next Level", type: "Creative engineering", summary: "A public-safe case is in preparation. Client and employer material is not shown here.", year: "2021—2022", cover: null, public: false }
  },
  timeline: [
    { id: "ipd", kind: "education", period: "2026—present", title: "Integrated Product Design", meta: "TU Delft", copy: "MSc · Product development", projects: ["ipd-journey", "apex-seat"] },
    { id: "easyfelt", kind: "work", period: "2024—present", title: "EASYfelt", meta: "R&D", copy: "Product development", projects: ["easyfelt-rd"] },
    { id: "dfi", kind: "education", period: "2025—2026", title: "Design for Interaction", meta: "TU Delft", copy: "MSc studies", projects: ["frame-the-waiting"] },
    { id: "bridging", kind: "education", period: "2025", title: "Bridging programme DFI", meta: "TU Delft", copy: "WO · Succeeded", projects: [] },
    { id: "bologna", kind: "education", period: "2022—2023", title: "Advanced Design", meta: "University of Bologna", copy: "Magistrale · Minor and graduation", projects: [] },
    { id: "3d-next-level", kind: "work", period: "2021—2022", title: "3D Next Level", meta: "Creative engineer", copy: "Concepts and engineering", projects: ["3d-next-level"] },
    { id: "ipd-bsc", kind: "education", period: "2019—2023", title: "Industrial Product Design", meta: "Rotterdam University of Applied Sciences", copy: "HBO BSc · Propedeuse and graduation", projects: ["grabable"] },
    { id: "secondary", kind: "education", period: "2014—2019", title: "HAVO-NT/NG", meta: "Stanislascollege Westplantsoen", copy: "High school study programme · Graduated", projects: [] }
  ]
};
