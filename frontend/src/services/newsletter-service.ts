import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { NewsletterForm } from "../types/newsletter";

export function registerOnNewsletter(email: NewsletterForm) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: '/newsletter',
        data: email,
    }
    return requestBackend(config);
}