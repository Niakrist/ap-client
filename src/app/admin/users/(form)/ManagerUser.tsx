import { IUser } from "@/app/types/types";
import { IDashboardTableBaseData } from "@/components/ui/Dashboard/dashboard-table.types";
import React from "react";
import { useManagerUsersQuery } from "./useManagerUsersQuery";

import styles from "./ManagerUser.module.scss";
import Link from "next/link";
import { Field } from "@/components/ui/Field/Field";
import Skeleton from "react-loading-skeleton";
import { DashboardTable } from "@/components/ui/Dashboard/DashboardTable";
import Image from "next/image";
import { ManagerUserShowMore } from "./ManagerUserShowMore";

interface IUserTable
  extends Pick<IUser, "id" | "email" | "country" | "avatarUrl">,
    IDashboardTableBaseData {}

export const ManagerUser = () => {
  const {
    deleteUser,
    isHasMore,
    isPending,
    searchTerm,
    setPage,
    setSearchTerm,
    users,
  } = useManagerUsersQuery();

  return (
    <div className={styles.mt5}>
      <div className={styles.wrapperContent}>
        <div>
          <h3>Users</h3>
          <Link className={styles.link} href={"/admin/users/create"}>
            Create a new user
          </Link>
        </div>
      </div>
      <Field
        value={searchTerm}
        placeholder="Search term..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isPending ? (
        <Skeleton count={4} />
      ) : (
        <DashboardTable<IUserTable>
          headerActions={["Edit", "Delete"]}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              render: (record) => record.id,
            },
            {
              title: "Avatar",
              dataIndex: "avatarUrl",
              render: (record) => {
                return (
                  record.avatarUrl && (
                    <Image
                      alt=""
                      src={record.avatarUrl}
                      width={50}
                      height={50}
                    />
                  )
                );
              },
            },
            {
              title: "Email",
              dataIndex: "email",
              render: (record) => record.email,
            },
            {
              title: "Country",
              dataIndex: "country",
              render: (record) => record.country,
            },
          ]}
          data={
            users?.map(({ id, ...user }) => ({
              id,
              avatarUrl: user.avatarUrl,
              email: user.email,
              country: user.country,
              editUrl: `/admin/users/edit/${id}`,
              deleteHandler: () => deleteUser(id),
            })) || []
          }
        ></DashboardTable>
      )}
      {isHasMore && (
        <ManagerUserShowMore setPage={setPage} loading={isPending} />
      )}
    </div>
  );
};
