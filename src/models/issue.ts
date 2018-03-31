/**
 * Model for issues.
 * Based on the API documentation: https://mediacomem.github.io/comem-citizen-engagement-api/#issues_post
 */

/**
 * Imports
 */
import { User } from "./user";
import { IssueType } from "./issue-Type";

export class Issue {
    assigneeHref: string;
    createdAt: Date;
    creatorHref: string;
    description: string;
    href: string;
    id: string;
    imageUrl: string;
    additionalImageUrls: [string];
    issueTypeHref: IssueType;
    location: {
        coordinates: [number, number],
        type: string
    };
    state: string;
    tags: [string];
    updatedAt: Date;
}

/*
            creator: User;
            issueType: issueType;



import { IssueAction } from "./issue-action";
import { IssueType, IssueType } from "./issue-type";


export class Issue {
            
    actions: IssueAction[];
    assignee: User;

}

*/
