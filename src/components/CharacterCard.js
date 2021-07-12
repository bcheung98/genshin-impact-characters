import React from "react";
import { formatTalents } from "../helpers/formatTalents";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 325,
        height: 175,
        margin: "auto",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "rgb(32, 32, 32)",
        border: "2px solid gray",
        borderRadius: "5px",
    },
    topRow: {
        margin: "auto",
        marginTop: "-15px",
        width: "95%",
    },
    name: {
        fontWeight: "bold",
        color: "white",
        marginTop: "2px",
        marginBottom: "10px",
        marginLeft: "-15px",
    },
    circleIcons: {
        position: "absolute",
        margin: "auto",
        marginTop: "-40px",
        marginLeft: "225px",
    },
    elementIcon: {
        height: "35px",
    },
    weaponIcon: {
        height: "35px",
    },
    leftColumn: {
        marginTop: "5px",
        marginLeft: "-40px",
        width: "100px",
    },
    characterIcon: {
        margin: 'auto',
        border: "2px solid gray",
        borderRadius: "5px",
        width: '90px',
        height: '90px',
        display: "block",
        cursor: "pointer",
    },
    stars: {
        height: "25px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
    },
    materialRow: {
        marginLeft: "-30px",
    },
    materialImage: {
        height: "48px",
        border: "2px solid gray",
        borderRadius: "5px",
        margin: "5px",
    },
    divider: {
        backgroundColor: "gray",
    },
    dialogRoot: {
        margin: "auto",
        maxWidth: "80vw",
    },
    dialogGrid: {
        flexGrow: 1,
    },
    dialogTitleMiddleColumn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    dialogTitleRightColumn: {
        textAlign: "center",
    },
    dialogStars: {
        height: "25px",
        marginLeft: "-5px",
    },
    dialogContent: {
        backgroundColor: "rgb(32, 32, 32)",
        border: "2px solid gray",
        borderRadius: "5px",
        color: "white",
    },
    characterCard: {
        border: "2px solid gray",
        borderRadius: "5px",
    },
    talentContainer: {
        border: "2px solid gray",
        borderRadius: "5px",
        height: "504px",
        marginTop: "8px",
        padding: "0px !important"
    },
    talentDisplay: {
        flexGrow: 1,
        display: 'flex',
        height: "500px",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    dialogDescription: {
        textAlign: "center",
    },
    nationIconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    nationIcon: {
        alignItems: "center",
        height: "86px",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MaterialTooltip = withStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
        fontSize: theme.typography.pxToRem(14),
    },
}))(Tooltip);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const CharacterCard = (props) => {
    const classes = useStyles();
    let { name, title, rarity, element, weapon, description, constellation, birthday, nation, voiceActors } = props.character;
    let { talents, ascensionMat, localMat, commonMat, bossMat } = props.character.materials;

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <div className={classes.topRow}>
                    <Typography className={classes.name} variant="h5">
                        {name}
                    </Typography>
                    <div className={classes.circleIcons}>
                        <MaterialTooltip title={element} arrow placement="top">
                            <img className={classes.elementIcon} src={require(`../assets/elements/Element_${element}.png`).default} alt={element} />
                        </MaterialTooltip>
                        <MaterialTooltip title={weapon} arrow placement="top">
                            <img className={classes.weaponIcon} src={require(`../assets/weapons/Weapon-class-${weapon.toLowerCase()}-icon.png`).default} alt={weapon} />
                        </MaterialTooltip>
                    </div>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs className={classes.leftColumn}>
                        <img className={classes.characterIcon} src={require(`../assets/characters/icons/Character_${name.split(" ").join("_")}_Icon.png`).default} alt={name} onClick={() => handleClickOpen()} />
                        <img className={classes.stars} src={require(`../assets/stars/Icon_${rarity}_Stars.png`).default} alt={rarity} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid className={classes.materialRow}>
                            <MaterialTooltip title={formatTalents(talents)} arrow placement="top">
                                <img className={classes.materialImage} src={require(`../assets/materials/talent_mats/${talents}.png`).default} alt={talents} />
                            </MaterialTooltip>
                            <MaterialTooltip title={ascensionMat} arrow placement="top">
                                <img className={classes.materialImage} src={require(`../assets/materials/ascension_mats/${ascensionMat.split(" ").join("_")}.png`).default} alt={ascensionMat} />
                            </MaterialTooltip>
                            <MaterialTooltip title={`${element} Gemstone`} arrow placement="top">
                                <img className={classes.materialImage} src={require(`../assets/materials/ascension_gems/${element}_Gemstone.png`).default} alt={element} />
                            </MaterialTooltip>
                        </Grid>
                        <Grid className={classes.materialRow}>
                            <MaterialTooltip title={localMat} arrow placement="top">
                                <img className={classes.materialImage} src={require(`../assets/materials/local_specialties/${localMat.split(" ").join("_")}.png`).default} alt={localMat} />
                            </MaterialTooltip>
                            <MaterialTooltip title={commonMat} arrow placement="top">
                                <img className={classes.materialImage} src={require(`../assets/materials/common_mats/${commonMat.split(" ").join("_")}.png`).default} alt={commonMat} />
                            </MaterialTooltip>
                            <MaterialTooltip title={bossMat} arrow placement="top">
                                <img className={classes.materialImage} src={require(`../assets/materials/boss_mats/${bossMat.split(" ").join("_")}.png`).default} alt={bossMat} />
                            </MaterialTooltip>
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    className={classes.dialogRoot}
                    maxWidth={false}
                    fullWidth
                >
                    <div className={classes.dialogContent}>
                        <DialogTitle>
                            <div className={classes.dialogGrid}>
                                <Grid container spacing={3}>
                                    <Grid item xs className={classes.dialogTitleLeftColumn}>
                                        {props.character.fullname ? <Typography variant="h4"><b>{props.character.fullname}</b></Typography> : <Typography variant="h4"><b>{name}</b></Typography>}
                                        <Typography variant="body1"><i>{title}</i></Typography>
                                        <img className={classes.dialogStars} src={require(`../assets/stars/Icon_${rarity}_Stars.png`).default} alt={rarity} />
                                        <div>
                                            <MaterialTooltip title={element} arrow placement="top">
                                                <img className={classes.dialogElementIcon} src={require(`../assets/elements/Element_${element}.png`).default} alt={element} />
                                            </MaterialTooltip>
                                            <MaterialTooltip title={weapon} arrow placement="top">
                                                <img className={classes.dialogWeaponIcon} src={require(`../assets/weapons/Weapon-class-${weapon.toLowerCase()}-icon.png`).default} alt={weapon} />
                                            </MaterialTooltip>
                                        </div>
                                    </Grid>
                                    <Grid item xs className={classes.dialogTitleMiddleColumn}>
                                        <Grid className={classes.dialogMaterialRow}>
                                            <MaterialTooltip title={formatTalents(talents)} arrow placement="top">
                                                <img className={classes.materialImage} src={require(`../assets/materials/talent_mats/${talents}.png`).default} alt={talents} />
                                            </MaterialTooltip>
                                            <MaterialTooltip title={ascensionMat} arrow placement="top">
                                                <img className={classes.materialImage} src={require(`../assets/materials/ascension_mats/${ascensionMat.split(" ").join("_")}.png`).default} alt={ascensionMat} />
                                            </MaterialTooltip>
                                            <MaterialTooltip title={`${element} Gemstone`} arrow placement="top">
                                                <img className={classes.materialImage} src={require(`../assets/materials/ascension_gems/${element}_Gemstone.png`).default} alt={element} />
                                            </MaterialTooltip>
                                            <MaterialTooltip title={localMat} arrow placement="top">
                                                <img className={classes.materialImage} src={require(`../assets/materials/local_specialties/${localMat.split(" ").join("_")}.png`).default} alt={localMat} />
                                            </MaterialTooltip>
                                            <MaterialTooltip title={commonMat} arrow placement="top">
                                                <img className={classes.materialImage} src={require(`../assets/materials/common_mats/${commonMat.split(" ").join("_")}.png`).default} alt={commonMat} />
                                            </MaterialTooltip>
                                            <MaterialTooltip title={bossMat} arrow placement="top">
                                                <img className={classes.materialImage} src={require(`../assets/materials/boss_mats/${bossMat.split(" ").join("_")}.png`).default} alt={bossMat} />
                                            </MaterialTooltip>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs className={classes.dialogTitleRightColumn}>
                                        <Typography><b>Constellation:</b> {constellation}</Typography>
                                        <Typography><b>Birthday:</b> {birthday}</Typography>
                                        <br />
                                        <Typography><b>Voice Actors</b></Typography>
                                        <Typography><b>EN:</b> {voiceActors["en"]}</Typography>
                                        <Typography><b>JP:</b> {voiceActors["jp"]}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </DialogTitle>
                        <Divider className={classes.divider} />
                        <DialogContent>
                            <Grid container spacing={2} className={classes.dialogMain}>
                                <Grid item>
                                    <img src={require(`../assets/characters/cards/Character_${name.split(" ").join("_")}_Card.png`).default} alt={name} className={classes.characterCard} />
                                </Grid>
                                <Grid item xs className={classes.talentContainer}>
                                    <div className={classes.talentDisplay}>
                                        <Tabs
                                            orientation="vertical"
                                            variant="scrollable"
                                            value={value}
                                            onChange={handleChange}
                                            className={classes.tabs}
                                        >
                                            <Tab label="Normal Attack" />
                                            <Tab label="Elemental Skill" />
                                            <Tab label="Elemental Burst" />
                                            <Tab label="Alternate Sprint" />
                                            <Tab label="1st Ascension Passive" />
                                            <Tab label="4th Ascension Passive" />
                                            <Tab label="Utility Passive" />
                                        </Tabs>
                                        <TabPanel value={value} index={0}>
                                            Normal Attack
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            Elemental Skill
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            Elemental Burst
                                        </TabPanel>
                                        <TabPanel value={value} index={3}>
                                            Alternate Sprint
                                        </TabPanel>
                                        <TabPanel value={value} index={4}>
                                            1st Ascension Passive
                                        </TabPanel>
                                        <TabPanel value={value} index={5}>
                                            4th Ascension Passive
                                        </TabPanel>
                                        <TabPanel value={value} index={6}>
                                            Utility Passive
                                        </TabPanel>
                                    </div>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <Divider className={classes.divider} />
                        <DialogContent>
                            <div className={classes.dialogDescription}>
                                <Typography><i>{description}</i></Typography>
                            </div>
                            <div className={classes.nationIconContainer}>
                                <img className={classes.nationIcon} src={require(`../assets/nations/${nation}.png`).default} alt={nation} />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Close
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </CardContent>
        </Card >
    )
}

export default CharacterCard;