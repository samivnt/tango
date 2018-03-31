/**
 * Model for uploading a new issue.
 * Based on the API documentation: https://mediacomem.github.io/comem-citizen-engagement-api/#issues_post
 */

export class IssueUpload {
    description: string;
    imageUrl: string;
    issueTypeHref: string;
    location: {
        coordinates: [number, number],
        type: string
    };
    tags: string[];
}
