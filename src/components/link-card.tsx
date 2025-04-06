import { useMemo } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LinkCardActions } from "./link-card-actions";

interface LinkCardProps {
  link: {
    title: string;
    originalUrl: string;
    shortUrl: string;
    shortCode: string;
    createdAt: string;
  };
}

export function LinkCard({ link }: LinkCardProps) {
  const formattedDate = format(new Date(link.createdAt), "dd/MM/yyyy");

  const domain = useMemo(() => {
    try {
      const url = new URL(link.originalUrl);
      return url.hostname.replace("www.", "");
    } catch {
      return "";
    }
  }, [link.originalUrl]);

  const faviconUrl = `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;

  return (
    <Card className="w-full shadow-md bg-zinc-50">
      <CardHeader>
        <CardTitle className="flex justify-between items-start flex-wrap gap-2">
          <Link
            to={`/links/${link.shortCode}/details`}
            className="flex items-center gap-3 hover:underline"
          >
            {domain && (
              <div className="w-8 h-8 bg-white border border-zinc-300 rounded-md shadow-sm flex items-center justify-center">
                <img
                  src={faviconUrl}
                  alt={`${domain} favicon`}
                  className="w-5 h-5"
                  loading="lazy"
                />
              </div>
            )}
            <h1 className="text-xl font-bold">{link.title}</h1>
          </Link>
          <LinkCardActions
            shortCode={link.shortCode}
            shortUrl={link.shortUrl}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <Link
          to={link.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 font-semibold text-md hover:underline"
        >
          {`linkfizz.com/${link.shortCode}`}
        </Link>
        <Link to={link.originalUrl} target="_blank" rel="noopener noreferrer">
          <p className="text-sm text-zinc-600 hover:text-zinc-800 hover:underline truncate max-w-3xl">
            {link.originalUrl}
          </p>
        </Link>
      </CardContent>

      <CardFooter>
        <div className="flex justify-between w-full text-sm text-zinc-500">
          <p className="flex items-center gap-2">
            <Calendar size={16} />
            <span className="mt-[2px]">{formattedDate}</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
