import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardHeader,
  CardMedia,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  withStyles,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import videoLink from "../../assets/videos/-RAI-data-analytics-.webm";
import { useState } from "react";
import { useEffect } from "react";
import { SnackbarContext } from "../../Context/SnackbarContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const EffectiveProgressBar = withStyles(() => ({
  root: {
    height: 8,
    borderRadius: 5,
    width: 500,
  },
  colorPrimary: {
    backgroundColor: "#7388A95A",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#FA2609",
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  videoCard: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  videoPlayer: {
    borderRadius: theme.spacing(1),
    minHeight: 500,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
  },

  quizContainer: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(2),
  },
  questionContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(2),
    alignItems: "flex-start",
  },
  progressContainer: {
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",

    rowGap: theme.spacing(1),
  },
}));

const questionsList = [
  {
    question: "What is the capital of India?",
    options: ["New Delhi", "Raipur", "Bengaluru", "Odisha"],
    correctOption: "New Delhi",
  },
  {
    question: "Richest man in the world?",
    options: ["Elon Musk", "Jeff Bezos", "Bill Gates", "Mukesh Ambani"],
    correctOption: "Elon Musk",
  },

  {
    question: "Which type of JavaScript language is ___",
    options: [
      "Object-Oriented",
      "Object-Based",
      "Assembly-language",
      "High-level",
    ],
    correctOption: "Object-Based",
  },
];
function TrainingVidoes() {
  const { callSnackbar } = useContext(SnackbarContext);
  const { id } = useParams();
  const title = id.replace("-", " ");
  const classes = useStyles();
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => {
    if (questionIndex === questionsList.length) {
      callSnackbar(true, "Quiz completed", "success");
      const timer = setTimeout(() => {
        setIsQuizOver(true);
      }, 2000);
    } else {
      setCurrentQuestion(questionsList[questionIndex]);
    }
  }, [questionIndex]);

  const submitAnswer = () => {
    if (selectedAnswer === currentQuestion.correctOption) {
      setQuestionIndex((prev) => prev + 1);
      callSnackbar(true, "Correct Answer", "success");
      setProgressValue(
        Math.round(((questionIndex + 1) / questionsList.length) * 100)
      );
    } else {
      callSnackbar(true, "Wrong Answer", "error");
    }
  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };
  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon color="primary" />}
        style={{ marginBottom: "20px" }}
      >
        <Link
          to="/loggedin/training"
          style={{ color: "#707070", textDecoration: "none" }}
        >
          Training
        </Link>
        <Link
          to={`/loggedin/training/${id}`}
          style={{ color: "#707070", textDecoration: "none" }}
        >
          Lesson Table
        </Link>
        <Link style={{ color: "#000", textDecoration: "none" }}> {title}</Link>
      </Breadcrumbs>

      {/* TOPIC: WHEN THE MODULE ISN't ASSIGNED
      <Typography variant="h2">
        No training modules have been assigned to you yet
      </Typography> */}

      <Card className={classes.videoCard} elevation={8}>
        <CardHeader title="Video title" />
        <CardMedia
          className={classes.videoPlayer}
          component="video"
          image={videoLink}
          alt="Training video"
          controls
        ></CardMedia>
      </Card>
      <Paper className={classes.quizContainer} elevation={8}>
        {!isQuizOver ? (
          <>
            <Typography variant="h2">Quiz</Typography>
            <Box className={classes.progressContainer}>
              <Typography variant="body1">
                Progress: <b>{progressValue} %</b>
              </Typography>
              <EffectiveProgressBar
                variant="determinate"
                value={progressValue}
              />
            </Box>
            <Box className={classes.questionContainer}>
              <Typography variant="h3">
                {questionIndex + 1}. {currentQuestion?.question}
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend">Options</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={selectedAnswer}
                  onChange={handleAnswerChange}
                >
                  {currentQuestion &&
                    currentQuestion.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio color="primary" />}
                        label={option}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  submitAnswer();
                }}
              >
                Submit Answer
              </Button>
            </Box>
          </>
        ) : (
          <Alert severity="success">You have already passed this quiz</Alert>
        )}
      </Paper>
    </div>
  );
}

export default TrainingVidoes;
