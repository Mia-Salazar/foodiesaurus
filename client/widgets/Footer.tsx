import Image from "next/image";
import {
  FaTwitter,
  FaLinkedinIn,
  FaDev,
  FaMedium,
  FaGithub,
} from "react-icons/fa";

const socialLinks = [
  {
    href: "https://twitter.com/miadeveloper",
    label: "Twitter de Mia Salazar (se abre en otra pestaña)",
    icon: FaTwitter,
  },
  {
    href: "https://www.linkedin.com/in/miasalazar/",
    label: "LinkedIn de Mia Salazar (se abre en otra pestaña)",
    icon: FaLinkedinIn,
  },
  {
    href: "https://dev.to/miasalazar",
    label: "Dev.to de Mia Salazar (se abre en otra pestaña)",
    icon: FaDev,
  },
  {
    href: "https://marasalazar.medium.com/",
    label: "Medium de Mia Salazar (se abre en otra pestaña)",
    icon: FaMedium,
  },
  {
    href: "https://github.com/Mia-Salazar",
    label: "GitHub de Mia Salazar (se abre en otra pestaña)",
    icon: FaGithub,
  },
];

export default function Footer() {
  return (
    <footer
      className="
        flex flex-col items-center
        bg-foodiesaurus-secondary
        text-white
        px-4 py-4 pb-20
        md:grid md:grid-cols-2
        md:px-5 md:py-4 md:pb-4
      "
    >
      {/* Logo */}
      <div>
        <div
          className="
            flex items-center
            font-semibold
            text-3xl
            font-teko 
          "
        >
          <p>Foodie</p>

          <figure className="mx-1 h-11 w-11">
            <Image
              src="/img/foodiesaurus-transparent.png"
              alt="Foodiesaurus logo"
              width={42}
              height={42}
              className="h-full w-full object-contain"
            />
          </figure>

          <p>saurus</p>
        </div>

        <p className="mt-5 font-sans text-sm">
          Foodiesaurus. Restaurantes sin alergias.
        </p>
      </div>

      {/* Redes */}
      <div
        className="
          mt-8
          flex flex-col items-center
          md:mt-0 md:items-end
        "
      >
        <p className="mb-1 text-center font-sans text-sm">
          Por{" "}
          <a
            href="https://miasalazar.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-1
              text-xl
              font-bold
              hover:text-foodiesaurus
              transition-colors
              font-teko
            "
          >
            Mia Salazar
            <span className="sr-only"> (se abre en otra pestaña)</span>
          </a>
        </p>

        <ul className="flex gap-1 p-0 list-none">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  text-white
                  hover:bg-foodiesaurus
                  transition-colors
                "
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}