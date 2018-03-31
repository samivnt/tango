/**
 * Model for issue types.
 * Based on the API documentation: https://mediacomem.github.io/comem-citizen-engagement-api/#issuetypes_get
 */

export class IssueType {
    href: string;
    id: string;
    name: string;
    description: string;
}
