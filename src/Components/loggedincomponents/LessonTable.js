import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
  withStyles,
} from "@material-ui/core";
import { OpenInNew } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const CompletionProgressBar = withStyles(() => ({
  root: {
    height: 8,
    width: "70%",
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#7388A95A",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "rgb(34, 154, 22)",
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  lessonTableContainer: {
    boxShadow:
      "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
  },
  header: {
    padding: theme.spacing(4),
  },
  tableHead: {},
  tableHeadCell: {
    "&:first-of-type": {
      boxShadow: "rgb(255 255 255) 8px 0px 0px inset",
      paddingLeft: theme.spacing(4),
      borderTopLeftRadius: theme.spacing(1),
      borderBottomLeftRadius: theme.spacing(1),
    },
    "&:last-of-type": {
      boxShadow: "rgb(255 255 255) -8px 0px 0px inset",
      paddingRight: theme.spacing(4),
      borderTopRightRadius: theme.spacing(1),
      borderBottomRightRadius: theme.spacing(1),
    },
    backgroundColor: "rgb(244, 246, 248)",
    padding: theme.spacing(2),
    color: "rgb(99, 115, 129)",
    fontWeight: 600,
    borderBottom: "none",
    fontSize: "0.875rem",
  },
  tableBodyCell: {
    "&:first-of-type": {
      paddingLeft: theme.spacing(4),
    },
    "&:last-of-type": {
      paddingRight: theme.spacing(4),
    },
    fontWeight: 400,
    textAlign: "left",
    color: "rgb(33, 43, 54)",
    padding: theme.spacing(2),
    borderBottom: "none",
    fontSize: "0.875rem",
  },
  statusStyle: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    fontSize: "0.75rem",
    fontWeight: 700,
  },
  inCompleteStatus: {
    color: "rgba(183,129, 3)",
    backgroundColor: "rgba(255, 193, 7, 0.16)",
  },
  completeStatus: {
    color: "rgb(34, 154, 22)",
    backgroundColor: "rgba(84, 214, 44, 0.16)",
  },
}));

const lessonsExample = [
  {
    id: 1,
    topic: "RAI agreements",
    totalQuestions: 5,
    questionsAnswered: 3,
    status: "Incomplete",
  },
  {
    id: 2,
    topic: "RAI work place policy",
    totalQuestions: 9,
    questionsAnswered: 9,
    status: "complete",
  },
  {
    id: 3,
    topic: "POSH Act for work place",
    totalQuestions: 10,
    questionsAnswered: 2,
    status: "Incomplete",
  },
];
const LessonTable = ({ type }) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.lessonTableContainer}>
      <Typography className={classes.header} variant="h2">
        {type.replace("-", " ")}
      </Typography>
      <Box>
        <TableContainer>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow className={classes.tableHeadRow}>
                <TableCell className={classes.tableHeadCell}>
                  Lesson No.
                </TableCell>
                <TableCell className={classes.tableHeadCell}>Topic</TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Progress
                </TableCell>
                <TableCell className={classes.tableHeadCell}>Status</TableCell>
                <TableCell className={classes.tableHeadCell}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessonsExample.map((lesson, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.tableBodyCell}>
                    {lesson.id}
                  </TableCell>
                  <TableCell
                    className={classes.tableBodyCell}
                    style={{ fontWeight: 500 }}
                  >
                    {lesson.topic}
                  </TableCell>
                  <TableCell className={classes.tableBodyCell}>
                    <Box
                      style={{
                        minWidth: "80px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                    >
                      <CompletionProgressBar
                        variant="determinate"
                        value={Math.round(
                          (lesson.questionsAnswered / lesson.totalQuestions) *
                            100
                        )}
                      />
                      <div>
                        {Math.round(
                          (lesson.questionsAnswered / lesson.totalQuestions) *
                            100
                        )}{" "}
                        %
                      </div>
                    </Box>
                  </TableCell>
                  <TableCell className={classes.tableBodyCell}>
                    <span
                      className={`${classes.statusStyle} ${
                        lesson.status === "Incomplete"
                          ? classes.inCompleteStatus
                          : classes.completeStatus
                      }`}
                    >
                      {lesson.status}
                    </span>
                  </TableCell>
                  <TableCell className={classes.tableBodyCell}>
                    <Link
                      to={`/loggedin/training-videos/${type}`}
                      style={{ color: "#707070", textDecoration: "none" }}
                    >
                      <OpenInNew color="primary" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default LessonTable;
