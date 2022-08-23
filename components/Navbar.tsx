import { Button, Col, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const LogoutComponent = styled(Col)``;

function Navbar() {
  const router = useRouter();
  return (
    <Row justify="end">
      <LogoutComponent>
        <Button>
          <Link href="/">Home</Link>
        </Button>
      </LogoutComponent>
      <LogoutComponent>
        <Button>
          <Link href="/report">Report</Link>
        </Button>
      </LogoutComponent>
      <LogoutComponent>
        <Button
          onClick={() => {
            localStorage.clear();
            router.push("/login");
          }}
        >
          <h4>logout</h4>
        </Button>
      </LogoutComponent>
    </Row>
  );
}

export default Navbar;
