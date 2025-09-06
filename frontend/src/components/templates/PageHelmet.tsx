import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description?: string;
};

export const PageHelmet = ({
  title,
  description = "User Management System",
}: Props) => (
  <Helmet title={`${title} | UMS`} prioritizeSeoTags>
    <meta charSet="utf-8" />
    <meta name="description" content={description} />
  </Helmet>
);
