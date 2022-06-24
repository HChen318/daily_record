import React, { useEffect, useState, useRef } from "react";
import { withI18n } from "./i18n";
import { toast } from "@/components";
import "./style.module.scss";
import {} from "./request";
// import sensors from '@/sa/sa.js'

function TestPage({ t, history }) {
  useEffect(() => {}, []);

  return <div className="test-page"></div>;
}

export default withI18n()(TestPage);
