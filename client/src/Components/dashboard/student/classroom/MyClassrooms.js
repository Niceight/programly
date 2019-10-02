import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyClassrooms } from "../../../../actions/classroomActions";
import { withStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CircularProgress from "../../../common/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  "@global": {
    body: {
      background: "white"
    }
  },
  card: {
    boxShadow: "none",
    "&:hover": {
      transform: "scale(1.04)",
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
    },
    width: 345,
    margin: theme.spacing(3, 2)
  },
  media: {
    height: 140
  },
  paper: {
    marginTop: 50,
    display: "flex",
    alignItems: "center"
  }
});

class MyClassrooms extends Component {
  componentDidMount() {
    if (this.props.getMyClassrooms(this.props.match.params.id)) {
      this.props.getMyClassrooms(this.props.match.params.id);
    }
  }
  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;
    const { classrooms, loading } = this.props.classroom;
    let classroomItems;

    if (classrooms === null || loading) {
      classroomItems = <CircularProgress />;
    } else {
      if (classrooms.data.length > 0) {
        classroomItems = classrooms.data.map(classroom => (
          <Card key={classroom._id} className={classes.card}>
            <CardActionArea
              component={Link}
              to={`/myClassrooms/classroom/${classroom._id}`}
            >
              <CardMedia
                className={classes.media}
                style={{ height: 0, paddingTop: "56%" }}
                image={require("../../../../img/undraw_teaching_f1cm.png")}
                title="classroom teaching"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {classroom.classroomName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Course code : {classroom.courseID}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ));
      } else {
        classroomItems = <h4>No classroom found...</h4>;
      }
    }
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>{classroomItems}</div>
      </Container>
    );
  }
}

MyClassrooms.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired,
  getMyClassrooms: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classroom: state.classroom
});

export default connect(
  mapStateToProps,
  { getMyClassrooms }
)(withStyles(styles)(MyClassrooms));
