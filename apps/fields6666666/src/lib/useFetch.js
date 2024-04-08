import { useState, useEffect } from "react";

export function useFetch() {

    async function postData( url = "", data = {} ) {

        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
            "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
    
        return response.json();
    
    }

    return { postData };

}