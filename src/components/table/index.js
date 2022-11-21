import React from "react";
import styled from "styled-components";
export const Table = ({ children, title, overFlowY, maxHeigth, styled }) => {
  return (
    <>
      <TableContainer maxHeigth={maxHeigth} styled={styled}>
        {title && <h3>{title}</h3>}
        <table>{children}</table>
      </TableContainer>
    </>
  );
};

const TableContainer = styled.div`
  max-height: ${(props) => (props.maxHeigth ? props.maxHeigth : "min-content")};
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--black-500);
    border-radius: 3px;
  }
  h3 {
    font-size: var(--size-14);
    margin-left: 15px;
  }
  table {
    min-width: 100%;
    font-size: 15px;
    thead {
      box-shadow: 0 0 30px 1px rgba(0,0,0,.1);
      background-color: var(--black-500);
      tr {
        width: 100%;
        th {
          text-align: left;
          padding: 0.5rem 0.3rem;
          color: var(--write-200);
        }
        th:first-child {
          border-left-style: solid;
          border-top-left-radius: 7px;
          border-bottom-left-radius: 7px;
        }
        th:last-child {
          border-right-style: solid;
          border-bottom-right-radius: 7px;
          border-top-right-radius: 7px;
        }
      }
    }
    tbody {
      tr {
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          background-color: var(--black-300);
        }
      }
      tr:nth-of-type(even) {
        background-color: var(--black-400);
      }
      td {
        padding: 0.2rem 0.3rem;
        color: var(--write-200);
        width: auto;
        &::-webkit-scrollbar {
          background-color: transparent;
          height: 0;
        }
      }
      td:first-child {
        border-left-style: solid;
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
      }
      td:last-child {
        border-right-style: solid;
        border-bottom-right-radius: 7px;
        border-top-right-radius: 7px;
      }
    }
  }
`;
