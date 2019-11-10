import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getClassroom } from "../../../../actions/classroomActions";
import { getAllExercises } from "../../../../actions/exerciseActions";
import { getProgresses } from "../../../../actions/progressActions";
import { withStyles } from "@material-ui/core/styles";
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
      background: theme.palette.common.white
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

class Student extends Component {
  getData() {
    this.props.getClassroom(this.props.match.params.classroomid);
    this.props.getAllExercises();
    this.props.getProgresses(this.props.match.params.studentid);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { classes } = this.props;
    const { classroom } = this.props.classroom;
    const { exercises } = this.props.exercise;
    const { progresses } = this.props.progress;

    let seeStudent,
      classroomData,
      classroomName,
      classroomCode,
      classroomStudent,
      progressData = [];

    if (classroom === null && exercises === null && progresses === null) {
      progressData = <CircularProgress />;
    } else if (classroom != null && exercises !== null && progresses !== null) {
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
      if (progresses.data.length > 0) {
        exercises.data.forEach(exercise => {
          for (let index = 0; index < progresses.data.length; index++) {
            if (progresses.data[index].exercise === exercise._id) {
              progressData.push(
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
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/myClassrooms/classroom/collaborate/${progresses.data[index]._id}/${progresses.data[index].exercise}`}
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
        progressData = <h4>No exercises found...</h4>;
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
          <div>{progressData}</div>
        </Container>
      </Container>
    );
  }
}

Student.propTypes = {
  auth: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired,
  getClassroom: PropTypes.func.isRequired,
  getAllExercises: PropTypes.func.isRequired,
  getProgresses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classroom: state.classroom,
  exercise: state.exercise,
  progress: state.progress
});

export default connect(
  mapStateToProps,
  { getClassroom, getAllExercises, getProgresses }
)(withStyles(styles)(Student));
