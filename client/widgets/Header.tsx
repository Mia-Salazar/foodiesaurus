'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaUser,
  FaChevronDown,
  FaBars,
  FaXmark
} from 'react-icons/fa6';

interface HeaderProps {
  isLoggedIn: boolean
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (!isMobileMenuOpen && !isDropdownOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen, isDropdownOpen]);

  const menuItems = [
    {
      label: 'Buscar',
      href: '/',
    },
    ...(isLoggedIn
      ? [
          {
            label: 'Añadir restaurante',
            href: '/restaurants/create',
          }
        ]
      : []),
    {
      label: 'Prehistoria',
      href: '/about'
    },
        ...(!isLoggedIn
      ? [
          {
            label: 'Iniciar sesión',
            href: '/login',
          }
        ]
      : []),
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
            
            <figure className="relative w-10 h-10 mx-1">
              <Image 
                src="/img/foodiesaurus-transparent.png" 
                alt="" 
                fill 
                className="object-contain" 
              />
            </figure>

            <span>saurus</span>
          </Link>

          <button
            type="button"
            className="lg:hidden z-50 flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:ring-2 focus:ring-white"
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
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-3 text-xl text-white lg:text-lg hover:bg-white/10 focus:ring-2 focus:ring-white"
                  >
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
                  aria-controls="account-menu"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md px-3 py-3 text-xl text-white lg:text-lg hover:bg-white/10"
                >
                  Mi cuenta
                  <FaChevronDown
                    aria-hidden="true"
                    className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isDropdownOpen && (
                  <ul
                    id="account-menu"
                    className="mt-2 overflow-hidden rounded-md bg-white text-gray-800 shadow-lg lg:absolute lg:right-0 lg:w-52"
                  >
                    {accountItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenus}
                          className="block min-h-11 px-4 py-3 hover:bg-teal-50 hover:text-foodiesaurus"
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