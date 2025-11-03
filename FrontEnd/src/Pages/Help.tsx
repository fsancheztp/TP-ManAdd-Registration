import { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
const Help = () => {

  const [visible, setVisible] = useState({
    generalOverview: true,
    detailedDescription: false,
    applicationSpecification: false,
  });

  return (
    <div className="lg:px-10 lg:py-10 mt-0 p-0 min-h-screen bg-slate-300">
      <div className="flex flex-col md:items-start items-center justify-between md:p-10 p-5">
        <h1 className="text-3xl font-extrabold text-orange-400 dark:text-orange-300">
          Ayuda
        </h1>
        <NavigationMenu className="mt-5">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Manual de Usuario</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-slate-700 text-white">
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="#"
                        onClick={() =>
                          setVisible({
                            generalOverview: true,
                            detailedDescription: false,
                            applicationSpecification: false,
                          })
                        }
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Vistazo General
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          ManAdd Registration App
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem
                    href="#"
                    title="Descripcion"
                    onClick={() =>
                      setVisible({
                        generalOverview: false,
                        detailedDescription: true,
                        applicationSpecification: false,
                      })
                    }
                  >
                    Detailed description about the Application
                  </ListItem>
                  <ListItem href="#" title="Especificaciones">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              {/* <Link href="/docs" legacyBehavior passHref> */}
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Ayuda
              </NavigationMenuLink>
              {/* </Link> */}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="mt-5 w-full">
          {visible?.generalOverview && <GeneralOverview />}
        </div>
      </div>
    </div>
  );
};

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const GeneralOverview = () => {
  return (
    <div className="flex w-full bg-slate-400 p-5 rounded-2xl">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Version</AccordionTrigger>
          <AccordionContent>
            1.0 | main Hash: ea2a4a201cba37dd0bf62e77c98f55a4122da63e 2024-11-13
            | First Deployment
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Requisitos</AccordionTrigger>
          <AccordionContent>
            <p>
              The customer wants to have a system that allows tracking the
              number of bags of minor ingredients that are entered in a manual
              addition, according to the target quantity required by the recipe
              being executed. In addition to the number of bags entered, it is
              also desired to know which user has performed the operation.
            </p>
            <p>
              In addition tothe above, there is the restriction of the place
              where the operation is carried out, which is classified as ATEX,
              so the electronic devices to be used have to be classified to be
              able to be used in that environment.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Solucion</AccordionTrigger>
          <AccordionContent>
            <p>
              A manual ATEX scanner will be available on which a web application
              will be deployed to facilitate the registration of the bags
              introduced.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Alcance</AccordionTrigger>
          <AccordionContent>
            <p>
              This solution is an add-on to Tetra Pak PlantMaster Production
              Integrator, so it must be deployed on the existing installation.
              It is initially designed for the manual addition area of product
              C03C20, although it is possible to extend it to other units.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Help;
