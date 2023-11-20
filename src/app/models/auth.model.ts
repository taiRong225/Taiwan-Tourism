export interface JWT {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    'not-before-polic': number;
    scope: string;
}