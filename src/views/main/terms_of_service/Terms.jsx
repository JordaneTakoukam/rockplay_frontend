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
    },
    DataTitle: {
        fontSize: 22,
        fontWeight: 600,
        color: '#FFF',
        fontFamily: 'Styrene A Web',
        marginBottom: 8
    },
    ContactText: {
        fontSize: 18,
        fontWeight: 400,
        color: '#FFF',
        fontFamily: 'Styrene A Web',
        marginTop: 30
    }
}));

const TermsOfService = () => {
    const classes = useStyles();

    const data = [
        {
            title: 'Acceptance of Terms',
            description: `By creating an account at ${emailConfig.websiteLink}, you agree to these Terms and confirm that you are over 18 years old (or the legal age in your jurisdiction).`
        },
        {
            title: 'Account Registration',
            description: 'You must provide accurate and complete information when registering an account. You are responsible for maintaining the confidentiality of your account details and all activities that occur under your account.'
        },
        {
            title: 'Use of the Website',
            description: 'You agree to use the website only for lawful purposes and in accordance with these Terms. It is prohibited to use the website for fraudulent or illegal activities.'
        },
        {
            title: 'Bonuses and Promotions',
            description: `All bonuses and promotions are subject to specific terms described on the promotion pages. ${emailConfig.websiteLink} reserves the right to modify or withdraw bonuses and promotions without prior notice.`
        },
        {
            title: 'Deposits and Withdrawals',
            description: `All deposits and withdrawals must be made in the available cryptocurrencies only on our website. ${emailConfig.websiteLink} is not responsible for loss or damage due to exchange rate fluctuations.`
        },
        {
            title: 'Wagering Requirements',
            description: 'Wagering requirements may apply to certain bonuses. These requirements must be met before winnings can be withdrawn. Please refer to the Bonus promotion pages for specific details.'
        },
        {
            title: 'Responsible Gambling',
            description: 'We encourage responsible gambling. If you need help managing your gambling behavior, please contact our customer service for support and information on self-exclusion and other resources.'
        },
        {
            title: 'Limitation of Liability',
            description: `${emailConfig.websiteLink} is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or services. We provide our services ‘as is’ and make no warranties of any kind.`
        },
        {
            title: 'Changes to Terms',
            description: 'We reserve the right to modify these Terms at any time. We will notify you of material changes by posting a notice on our website or through other communication methods. By continuing to use our services, you agree to the revised Terms.'
        },
        // {
        //     title: 'Termination',
        //     description: 'We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent or illegal activities.'
        // }
    ];

    return (
        <Box className={classes.MainLayout}>
            <Box className={classes.DetailBox}>
                <Typography className={classes.PageTitle}>Terms and Conditions</Typography>

                <Box className={classes.DataTextBox} style={{ marginTop: '40px' }}>
                    {data.map((item, index) => (
                        <Box className={classes.DataLine} key={index}>
                            <Box className={classes.DataIndex}>{index + 1}</Box>
                            <Box>
                                <Typography className={classes.DataTitle}>{item.title}</Typography>
                                <Typography className={classes.DataText}>{item.description}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Paragraph for Contact */}
                <Typography className={classes.ContactText}>
                    If you have any questions about these terms and conditions, please contact us always, {emailConfig.contactEmail}.
                </Typography>
            </Box>
        </Box>
    );
};

export default TermsOfService;
