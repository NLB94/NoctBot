import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { GuildMenuContainer, SpinnerComponent } from "../../components";
import { getUserDetails } from "../../utils/api";
import "./menu-page.css";

export function MenuPage({ history }) {
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails()
      .then(({ data }) => {
        setGuilds(data.guilds);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      })
      .catch((err) => {
        setTimeout(() => {
          setLoading(false);
          console.log(err);
          history.push("/");
        }, 200);
      });
  });

  return (
    <Flex className="menu-page-root">
      {(!loading && (
        <GuildMenuContainer history={history} guilds={guilds} />
      )) || <SpinnerComponent />}
    </Flex>
  );
}
