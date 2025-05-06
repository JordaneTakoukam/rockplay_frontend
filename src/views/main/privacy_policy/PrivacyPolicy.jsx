import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import emailConfig from "config/email_config";

const useStyles = makeStyles(() => ({
    MainLayout: {
        width: '100%',
        padding: '12px'
    },
    HelpTreeBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    PageTitle: {
        fontFamily: 'Styrene A Web',
        fontWeight: 900,
        fontSize: 28,
        lineHeight: '32px',
        textTransform: 'uppercase',
        color: '#FFF'
    },
    DetailBox: {
        marginTop: 21,
        marginBottom: 30
    },
    PageGroupTitle: {
        fontSize: 20,
        fontWeight: 400,
        color: '#FFF',
        fontFamily: 'Styrene A Web',
        marginTop: 30,
        marginBottom: 14
    },
    DataLine: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 16,
        marginBottom: 40
    },
    DataIndex: {
        width: 41,
        height: 41,
        background: 'linear-gradient(48.57deg, #5A45D1 24.42%, #BA6AFF 88.19%)',
        borderRadius: '50%',
        fontFamily: 'Styrene A Web',
        fontSize: 20,
        fontWeight: 400,
        color: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none'
    },
    DataText: {
        fontSize: 20,
        fontWeight: 400,
        color: '#FFF',
        fontFamily: 'Styrene A Web'
    }
}));

const PrivacyPolicy = () => {
    const classes = useStyles();

    const data = [
        {
            title: 'Data Collection',
            description: 'We collect various types of data to provide and improve our services:',
            list: [
                'Personal Data: Information you provide when registering an account, such as name, email address, and wallet address.',
                'Transaction Data: Data about the deposits and withdrawals you make through our platform.',
                'Technical Data: Information such as IP address, browser type, and device identification that is automatically collected when you visit our website.'
            ]
        },
        {
            title: 'Data Use',
            description: 'We use your data to:',
            list: [
                'Manage your account and provide our services.',
                'Process and secure transactions.',
                'Improve our website and services.',
                'Comply with legal obligations.',
                'Communicate with you, including sending promotions and updates.'
            ]
        },
        {
            title: 'Data Protection',
            description: 'We take appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, or misuse.'
        },
        {
            title: 'Data Sharing',
            description: 'We do not share your personal data with third parties, except:',
            list: [
                'When necessary to provide our services (e.g., payment processors).',
                'To comply with legal obligations.',
                'With your consent.'
            ]
        },
        {
            title: 'Your Rights',
            description: 'You have the right to:',
            list: [
                'Request access to your personal data.',
                'Have incorrect or incomplete data corrected.',
                'Request deletion of your data, under certain conditions.',
                'Object to the processing of your data.'
            ]
        },
        {
            title: 'Cookies',
            description: 'Our website uses cookies to improve your experience. Cookies are small text files stored on your device. You can adjust your browser settings to refuse cookies, but this may affect the functionality of our website.'
        },
        {
            title: 'Changes to the Privacy Policy',
            description: 'We reserve the right to change this privacy policy at any time. We will notify you of significant changes by posting a notice on our website or through other communication channels.'
        }
    ];

    return (
        <Box className={classes.MainLayout}>
            <Box className={classes.DetailBox}>
                <Typography className={classes.PageTitle}>Privacy Policy</Typography>
                <Typography className={classes.PageGroupTitle} style={{ marginTop: "40px", marginBottom: "40px" }}>Welcome to {emailConfig.websiteLink}. We value your privacy and this policy explains how we handle your data.</Typography>
                <Box className={classes.DataTextBox}>
                    {
                        data.map((item, index) => (
                            <Box className={classes.DataLine} key={index}>
                                <Box className={classes.DataIndex}>{index + 1}</Box>
                                <Box>
                                    <Typography className={classes.DataText}><strong>{item.title}:</strong></Typography>
                                    <Typography className={classes.DataText}>{item.description}</Typography>
                                    {item.list && (
                                        <ul>
                                            {item.list.map((listItem, i) => (
                                                <li key={i}>
                                                    <Typography className={classes.DataText}>{listItem}</Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
                <Typography className={classes.DataText} style={{ marginTop: 20 }}>If you have any questions about this privacy policy, please contact us always, {emailConfig.contactEmail}.</Typography>
            </Box>
        </Box>
    );
};

export default PrivacyPolicy;
