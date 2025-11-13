// Utility functions for MyFoodApp

import { MenuItem, AveragePrice } from './types';

/**
 * Calculates the average price for each course using a for loop.
 * @param menuItems - Array of menu items
 * @returns Array of average prices per course
 */
export function calculateAveragePricePerCourse(menuItems: MenuItem[]): AveragePrice[] {
  const courseTotals: { [course: string]: { total: number; count: number } } = {};

  // Use for loop to iterate through menu items
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    if (!courseTotals[item.course]) {
      courseTotals[item.course] = { total: 0, count: 0 };
    }
    courseTotals[item.course].total += item.price;
    courseTotals[item.course].count += 1;
  }

  const averages: AveragePrice[] = [];

  // Use for-in loop to iterate through course totals
  for (const course in courseTotals) {
    if (courseTotals.hasOwnProperty(course)) {
      const { total, count } = courseTotals[course];
      averages.push({
        course,
        average: total / count
      });
    }
  }

  return averages;
}

/**
 * Filters menu items by selected courses using a while loop.
 * @param menuItems - Array of menu items
 * @param filteredCourses - Array of course names to include
 * @returns Filtered array of menu items
 */
export function filterMenuItems(menuItems: MenuItem[], filteredCourses: string[]): MenuItem[] {
  const filtered: MenuItem[] = [];
  let i = 0;

  // Use while loop to filter items
  while (i < menuItems.length) {
    if (filteredCourses.includes(menuItems[i].course)) {
      filtered.push(menuItems[i]);
    }
    i++;
  }

  return filtered;
}
