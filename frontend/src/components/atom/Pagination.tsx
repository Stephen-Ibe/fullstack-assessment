import {
  Pagination as MantinePagination,
  type PaginationProps,
} from "@mantine/core";

type Props = PaginationProps;

export const Pagination = (props: Props) => <MantinePagination {...props} />;
