"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./[...slug]/Sidebar.module.css";
import { NoteTagAll} from "@/types/note";


export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={css.sidebar}>
            <h2 className={css.title}>Filter by Tag</h2>
            <ul className={css.menuList}>
                {NoteTagAll.map((tag) => {
                    const href = `/notes/filter/${tag}`;
                    const isActive = pathname === href;
                    return (
                        <li key={tag} className={css.menuItem}>
                            <Link
                                href={href}
                                className={`${css.menuLink} ${isActive ? "active" : ""}`}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {tag === "All" ? "All notes" : tag}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}