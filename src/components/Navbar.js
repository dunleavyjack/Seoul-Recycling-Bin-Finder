import React from 'react';
import infoIcon from '../assets/images/infoImg.png';
import title from '../assets/images/title.png';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: 'white',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
        maxWidth: '450px',
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="nav">
            <img className="navInfoTitle" src={title} alt="Title" />
            <img
                className="navInfoImage"
                src={infoIcon}
                alt="Info"
                onClick={handleOpen}
            />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">EN</h2>
                        <p id="transition-modal-description">
                            Not seeing a bin from your area? Send a photo of the
                            bin along with either a description of its location
                            or Kakao maps screenshot to sseuregiclub@gmail.com
                            :)
                        </p>
                        <h2 id="transition-modal-title">KR</h2>
                        <p id="transition-modal-description">
                            여기에 보이지 않는 쓰레기통이 주변에 있나요?
                            쓰레기통의 사진과 함께 그 위치에 대한 설명이나
                            카카오맵 캡쳐를 sseuregiclub@gmail.com 으로
                            보내주세요 :)
                        </p>
                        <div className="personalLinks">
                            <p>
                                <a
                                    className="customLink"
                                    href="https://github.com/dunleavyjack/Sseuregi-Club-V2"
                                >
                                    Github
                                </a>{' '}
                                |{' '}
                                <a
                                    className="customLink"
                                    href="https://medium.com/@jackdunleavy"
                                >
                                    Medium
                                </a>{' '}
                                |{' '}
                                <a
                                    className="customLink"
                                    href="https://www.linkedin.com/in/jack-dunleavy-0b177b83/"
                                >
                                    LinkedIn
                                </a>
                            </p>
                            <p>Jack</p>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default Navbar;
