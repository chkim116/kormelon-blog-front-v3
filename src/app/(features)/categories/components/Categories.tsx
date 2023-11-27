'use client';
import NextLInk from 'next/link';
import { Link } from '@nextui-org/react';
import { LucideIcon } from '@shared/components/common/LucideIcon';
import { CategorySearchUiState } from '@domain/category/category.uiState';

interface CategoriesProps {
  categories: CategorySearchUiState[];
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <section className="flow-root max-w-xl mx-auto my-12 px-2">
      <ul className="divide-gray-300 -my-6 divide-y">
        {categories?.map(({ value, id, posts }) => (
          <li
            key={id}
            className="group relative flex items-center font-semibold justify-between py-6"
          >
            <Link
              as={NextLInk}
              href={`/blog?categoryId=${id}`}
              className="mr-4 static text-base sm:text-lg text-primary-900"
            >
              <span className="absolute inset-0" aria-hidden={true} />
              {value}
            </Link>
            <p className="group-hover:text-primary-900 flex-shrink-0 text-sm font-semibold text-gray-500 ml-auto sm:text-base">
              {posts} posts
            </p>
            <LucideIcon
              name="arrow-right"
              className="ml-1  leading-6 text-gray-500 group-hover:text-primary-900"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
