import { Pagination } from "./pagination";

export class PaginatedResult<T> {
    result: T | undefined;
    pagination: Pagination | undefined;
}