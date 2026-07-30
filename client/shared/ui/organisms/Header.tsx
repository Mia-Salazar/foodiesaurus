'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaMagnifyingGlass,
  FaPlus,
  FaUser,
  FaChevronDown,
  FaBars,
  FaXmark
} from 'react-icons/fa6';

export default function Header({ isLoggedIn = false }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const menuItems = [
    {
      label: 'Buscar',
      href: '/',
      icon: FaMagnifyingGlass
    },
    ...(isLoggedIn
      ? [
          {
            label: 'Añadir restaurante',
            href: '/restaurant/search',
            icon: FaPlus
          }
        ]
      : []),
    {
      label: 'Prehistoria',
      href: '/about'
    },
    {
      label: 'Soy un restaurante',
      href: '/restaurant-owner'
    }
  ];

  const accountItems = [
    {
      label: 'Perfil',
      href: '/profile'
    },
    {
      label: 'Mis restaurantes',
      href: '/profile/restaurants'
    },
    {
      label: 'Mis opiniones',
      href: '/profile/scores'
    }
  ];

  return (
    <header className="bg-foodiesaurus shadow-sm w-full">
      <div className="max-w-7xl flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="h-20 flex items-center justify-between w-full lg:w-auto">

          <Link
            href="/"
            aria-label="Foodiesaurus inicio"
            className="flex items-center text-3xl font-semibold tracking-wide font-teko text-white z-50"
          >
            <span>Foodie</span>
            
            <span className="relative w-10 h-10 mx-1">
              <Image 
                src="/img/foodiesaurus.png" 
                alt="" 
                fill 
                className="object-contain" 
              />
            </span>

            <span>saurus</span>
          </Link>

          <button
            type="button"
            className="lg:hidden z-50 p-2 rounded-md text-white hover:bg-white/10 focus:ring-2 focus:ring-white"
            aria-controls="main-navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">
              {isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            </span>

            {isMobileMenuOpen
              ? <FaXmark size={24} aria-hidden="true" />
              : <FaBars size={24} aria-hidden="true" />}
          </button>

        </div>

        <nav
          id="main-navigation"
          aria-label="Navegación principal"
          className={`
            ${isMobileMenuOpen ? 'flex' : 'hidden'}
            lg:flex
            fixed
            lg:static
            inset-0
            z-40
            bg-foodiesaurus
            items-center
            justify-center
          `}
        >
          <ul className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    className="flex items-center justify-center gap-2 px-3 py-3 text-white text-xl lg:text-lg rounded-md hover:bg-white/10 focus:ring-2 focus:ring-white"
                  >
                    {Icon && <Icon aria-hidden="true" />}
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {isLoggedIn && (
              <li className="relative">
                <button
                  type="button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center gap-2 px-3 py-3 text-white text-xl lg:text-lg rounded-md hover:bg-white/10 w-full"
                >
                  <FaUser aria-hidden="true" />
                  Mi cuenta
                  <FaChevronDown
                    aria-hidden="true"
                    className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isDropdownOpen && (
                  <ul className="mt-2 lg:absolute lg:right-0 lg:w-52 bg-white rounded-md shadow-lg overflow-hidden text-gray-700">
                    {accountItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenus}
                          className="block px-4 py-3 hover:bg-teal-50 hover:text-[#319DA0]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}

          </ul>
        </nav>

      </div>
    </header>
  );
}