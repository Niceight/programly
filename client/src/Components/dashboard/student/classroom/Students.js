import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getClassroom } from "../../../../actions/classroomActions";
import { getAllStudents } from "../../../../actions/studentActions";
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
  studentCard: {
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

class Students extends Component {
  getData() {
    this.props.getClassroom(this.props.match.params.id);
    this.props.getAllStudents();
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { classes } = this.props;
    const { classroom } = this.props.classroom;
    const { students } = this.props.student;
    let seeExercise;
    let classroomData,
      classroomName,
      classroomCode,
      classroomStudent,
      studentData = [];

    if (classroom === null && students === null) {
      studentData = <CircularProgress />;
    } else if (classroom !== null && students !== null) {
      seeExercise = (
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/myClassrooms/classroom/${classroom.data[0]._id}`}
        >
          see exercises
        </Button>
      );
      classroomData = classroom.data[0];
      classroomName = classroomData.classroomName;
      classroomCode = classroomData.courseID;
      classroomStudent = classroomData.student.length;
      if (classroomData.student.length > 0) {
        students.data.forEach(student => {
          for (let index = 0; index < classroomData.student.length; index++) {
            if (classroomData.student[index] === student._id) {
              studentData.push(
                <Card key={student._id} className={classes.studentCard}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {student.firstname} {student.lastname}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {student.studentID}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/myClassrooms/classroom/student/${classroom.data[0]._id}/${student._id}`}
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
        studentData = <h4>No students found...</h4>;
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
          {seeExercise}
        </div>
        <Container component="main" maxWidth="md">
          <div>{studentData}</div>
        </Container>
      </Container>
    );
  }
}

Students.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classroom: state.classroom,
  student: state.student
});

export default connect(
  mapStateToProps,
  { getClassroom, getAllStudents }
)(withRouter(withStyles(styles)(Students)));
