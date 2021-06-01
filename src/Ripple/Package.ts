export interface Package {
    name: string;
    version: string;
    description: string;
    main: string;
    author: string;
    license: string;
    homepage: string;
    keywords: string[];
    scripts: {
        start: string;
        test: string;
    };
}