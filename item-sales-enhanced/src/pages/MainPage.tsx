import React, { useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { CategoryFilter } from '../components/layout/CategoryFilter';
import { ComponentList } from '../components/library/ComponentList';
import { mockComponents, mockCategories } from '../data/mockData';

export function MainPage() {
  const { state, dispatch } = useLibrary();

  useEffect(() => {
    dispatch({ type: 'SET_COMPONENTS', payload: mockComponents });
    dispatch({ type: 'SET_CATEGORIES', payload: mockCategories });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CategoryFilter />
      <main className="flex-1 p-8">
        <div className="w-full">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {state.selectedCategory 
                ? state.categories.find(c => c.id === state.selectedCategory)?.name 
                : 'All Components'
              }
            </h2>
            <p className="text-gray-600">
              {state.selectedCategory 
                ? state.categories.find(c => c.id === state.selectedCategory)?.description
                : 'Browse and explore our comprehensive component library'
              }
            </p>
          </div>
          <ComponentList />
        </div>
      </main>
    </div>
  );
}