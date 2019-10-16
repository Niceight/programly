import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getClassroom } from "../../../../actions/classroomActions";
import { getAllExercises } from "../../../../actions/exerciseActions";
import { createProgress } from "../../../../actions/progressActions";
import { withStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CircularProgress from "../../../common/CircularProgress";

const styles = theme => ({
  "@global": {
    body: {
      background: "white"
    }
  },
  root: {
    padding: theme.spacing(3, 2)
  },
  card: {
    maxWidth: 1200,
    height: 200
  },
  media: {
    maxHeight: 200
  },
  paper: {
    marginTop: 50,
    display: "flex",
    alignItems: "center"
  },
  exerciseCard: {
    boxShadow: "0 4px 20px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
    maxWidth: 950,
    margin: theme.spacing(3, 2)
  },
  pos: {
    marginBottom: 12
  }
});

class Classroom extends Component {
  getData() {
    this.props.getClassroom(this.props.match.params.id);
    this.props.getAllExercises();
  }

  componentDidMount() {
    this.getData();
  }

  onClick = (user, exercise) => {
    const newProgress = {
      student: user,
      exercise: exercise._id,
      content: exercise.content
    };

    this.props.createProgress(newProgress);
  };

  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;
    const { classroom } = this.props.classroom;
    const { exercises, loading } = this.props.exercise;
    let seeStudent;
    let classroomData,
      classroomName,
      classroomCode,
      classroomStudent,
      exerciseData = [];

    if (classroom === null && exercises === null) {
      exerciseData = <CircularProgress />;
    } else if (classroom !== null && exercises !== null) {
      seeStudent = (
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/myClassrooms/classroom/students/${classroom.data[0]._id}`}
        >
          see students
        </Button>
      );
      classroomData = classroom.data[0];
      classroomName = classroomData.classroomName;
      classroomCode = classroomData.courseID;
      classroomStudent = classroomData.student.length;
      if (classroomData.exercise.length > 0) {
        exercises.data.forEach(exercise => {
          for (let index = 0; index < classroomData.exercise.length; index++) {
            if (classroomData.exercise[index] === exercise._id) {
              exerciseData.push(
                <Card key={exercise._id} className={classes.exerciseCard}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {exercise.topicName}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {exercise.topic}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {exercise.question}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={this.onClick.bind(this, user.id, exercise)}
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/myClassrooms/classroom/progress/${user.id}/${exercise._id}`}
                    >
                      open
                    </Button>
                  </CardActions>
                </Card>
              );
            }
          }
        });
      } else {
        exerciseData = <h4>No exercises found...</h4>;
      }
    }
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              style={{ height: 0, paddingTop: "56%" }}
              image={require("../../../../img/undraw_master_plan_95wa.png")}
              title="classroom"
            />
          </CardActionArea>
        </Card>
        <div className={classes.root}>
          <Typography gutterBottom variant="h5" component="h2">
            {classroomName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Course code: {classroomCode} • {classroomStudent} students
          </Typography>
          {seeStudent}
        </div>
        <Container component="main" maxWidth="md">
          <div>{exerciseData}</div>
        </Container>
      </Container>
    );
  }
}

Classroom.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classroom: state.classroom,
  exercise: state.exercise
});

export default connect(
  mapStateToProps,
  { getClassroom, getAllExercises, createProgress }
)(withRouter(withStyles(styles)(Classroom)));
