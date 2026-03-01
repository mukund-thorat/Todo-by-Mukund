import {type todoModel, todoObject} from "../entities/todo.ts";
import {fetchWithAuth} from "./protected-request.ts";

export async function getActiveTodos(): Promise<todoModel[]> {
    const response = await fetchWithAuth("http://localhost:8000/todos/active", {
        method: "GET",
    })

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("Invalid todos response");
    }

    return data.map((item) => todoObject.parse(item));
}
