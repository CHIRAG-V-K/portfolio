import {
    Home,
    BadgeInfo,
    BriefcaseBusiness,
    Contact,
    Layers,
} from "lucide-react";
import {
    mobile,
    backend,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    rhibhus,
    rhibhus_logo,
    carrent,
    jobit,
    tripguide,
    threejs,
    java,
    springboot,
    mysql,
    postgresql,
    aws,
    gcp,
    python,
    reactnative,
    nextjs,
    kubernetes,
    gitlab,
    cicd,
    graphql,
} from "../assets";

export const navItems = [
    { id: "home", icon: Home },
    { id: "about", icon: BadgeInfo },
    { id: "work", icon: BriefcaseBusiness },
    { id: "tech", icon: Layers },
    { id: "contactus", icon: Contact },
]

export const phrases = [
    `I'm a Full Stack Developer`,
    // `I'm an Application Developer`,
    // `I'm a Backend Developer`,
];
export const name = ["Full Stack Developer", "Application Developer", "Backend Developer"];

export const services = [
    {
        title: "Full Stack Developer",
        icon: web,
    },
    {
        title: "React Native Developer",
        icon: mobile,
    },
    // {
    //     title: "Backend Developer",
    //     icon: backend,
    // },
];

export const experiences = [
    {
        title: "Full Stack Developer",
        company_name: "Rhibhus Infosystems PVT LTD",
        icon: rhibhus_logo,
        iconBg: "#E6DEDD",
        date: "Oct 2022 - Present",
        points: [
            "Current Engagement: Since March 2025, I have been developing the Flipkart Trust Shield microservice ecosystem to manage after-sales warranties, utilizing Spring Boot (Java 21), WebFlux, and Project Reactor for real-time operations",
            "Leadership & Architecture: I previously led a team of three developers to architect secure backends and high-quality React UIs, successfully standardizing coding structures to improve code quality by 30%.",
            "Performance Optimization: I spearheaded backend automation using AWS and Azure, which resulted in a 40% reduction in API response times through the implementation of Lambda functions and caching strategies.",
            "Integrations: I have extensive experience integrating critical third-party services like Stripe, Razorpay, and WhatsApp, which increased user engagement by 25%.",
        ],
    },
];

export const technologies = [
    // Programming Languages
    {
        name: "Java",
        icon: java,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    // Frameworks & Libraries
    {
        name: "Spring Boot",
        icon: springboot,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Next.js",
        icon: nextjs,
    },
    {
        name: "React Native",
        icon: reactnative,
    },
    {
        name: "Python",
        icon: python,
    },
    {
        name: "Node JS",
        icon: nodejs,
    },
    {
        name: "Redux Toolkit",
        icon: redux,
    },

    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Three JS",
        icon: threejs,
    },
    {
        name: "GraphQL",
        icon: graphql,
    },
    // Databases & Caching
    {
        name: "MySQL",
        icon: mysql,
    },
    {
        name: "PostgreSQL",
        icon: postgresql,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    // Technologies & Tools
    {
        name: "AWS",
        icon: aws,
    },
    {
        name: "GCP",
        icon: gcp,
    },
    {
        name: "Docker",
        icon: docker,
    },
    {
        name: "Kubernetes",
        icon: kubernetes,
    },
    {
        name: "Git",
        icon: git,
    },
    {
        name: "CI/CD",
        icon: cicd,
    },
    {
        name: "Figma",
        icon: figma,
    },
];


export const projects = [
    {
        name: "Car Rent",
        description:
            "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "mongodb",
                color: "green-text-gradient",
            },
            {
                name: "tailwind",
                color: "pink-text-gradient",
            },
        ],
        image: carrent,
        source_code_link: "https://github.com/",
    },
    {
        name: "Job IT",
        description:
            "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "restapi",
                color: "green-text-gradient",
            },
            {
                name: "scss",
                color: "pink-text-gradient",
            },
        ],
        image: jobit,
        source_code_link: "https://github.com/",
    },
    {
        name: "Trip Guide",
        description:
            "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
        tags: [
            {
                name: "nextjs",
                color: "blue-text-gradient",
            },
            {
                name: "supabase",
                color: "green-text-gradient",
            },
            {
                name: "css",
                color: "pink-text-gradient",
            },
        ],
        image: tripguide,
        source_code_link: "https://github.com/",
    },
];
