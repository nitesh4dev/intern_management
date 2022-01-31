import { css } from "@emotion/core";
import {
    Grid,
    makeStyles
} from '@material-ui/core'
import GridLoader from "react-spinners/GridLoader";

const override = css`
  width: 100%;
  display: block;
  margin: 0 auto;
  border-color: #F72A1F;
`;

const useStyle = makeStyles((theme) => ({
    loaderBox: {
        maxWidth: "90px",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100vh"

    }
}))

function LoadingScreen() {
    const classes = useStyle();

    return (
        <Grid container direction="column" justify="center" alignContent="center" className={classes.loaderBox}>
            <GridLoader color="#F72A1F" loading={true} css={override} size={20} />
        </Grid>
    );
}

export default LoadingScreen;