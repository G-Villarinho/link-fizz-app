import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",
  links: "Links",
  details: "Detalhes",
  create: "Criar",
  domains: "Domínios",
  pages: "Páginas",
  support: "Suporte",
  feedback: "Feedback",
  settings: "Configurações",
  profile: "Perfil",
};

export function AppBreadcrumb() {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter(Boolean)
    .filter((seg, i, arr) => {
      const isParamLike = !breadcrumbMap[seg] && i < arr.length - 1;
      return !isParamLike;
    });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const to = "/" + pathSegments.slice(0, index + 1).join("/");

          const label = breadcrumbMap[segment] || segment;

          return (
            <div key={to} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
