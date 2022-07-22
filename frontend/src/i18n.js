import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { register } from 'timeago.js'
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    'User Signup Page': 'User Signup Page',
                    'Username': 'Username',
                    'Display name': 'Display name',
                    'Password': 'Password',
                    'Password repeat': 'Password repeat',
                    'Sign Up': 'Sign Up',
                    'Login': 'Login',
                    'Login Page': 'Login Page',
                    'password mismatch': 'password mismatch',
                    'Logout': 'Logout',
                    'Users': 'Users',
                    'Next': 'Next',
                    'Previous': 'Previous',
                    'Load Failure': 'Load Failure',
                    'User not found!': 'User not found!',
                    'Edit': 'Edit',
                    'Change Display Name': 'Change Display Name',
                    'Save': 'Save',
                    'Cancel': 'Cancel',
                    'Account': 'Account',
                    'There are no hoaxes': 'There are no hoaxes',
                    'There are new hoaxes': 'There are new hoaxes',
                    'Load old hoaxes': 'Load old hoaxes',
                    'Hoax has unknown attachment': 'Hoax has unknown attachment',
                    'Are you sure to delete hoax?': 'Are you sure to delete hoax?',
                    'Are you sure to delete your account?': 'Are you sure to delete your account?',
                    'Delete Hoax': 'Delete Hoax',
                    'Delete Account': 'Delete Account',

                    'Delete': 'Delete'
                }
            },
            tr: {
                translation: {
                    'User Signup Page': 'Kayıt Formu',
                    'Username': 'Kullanıcı adı',
                    'Display name': 'Tercih edilen isim',
                    'Password': 'Parola',
                    'Password repeat': 'Parolayı tekrarla ',
                    'Sign Up': 'Kayıt Ol',
                    'Login': 'Giriş Yap',
                    'Login Page': 'Giriş Sayfası',
                    'password mismatch': 'parolalar eşleşmiyor',
                    'Logout': 'Çıkış',
                    'Users': 'Kullanıcılar',
                    'Next': 'Sonraki',
                    'Previous': 'Önceki',
                    'Load Failure': 'Kullanıcılar Yüklenemedi',
                    'User not found!': 'Kullanıcı bulunamadı!',
                    'Edit': 'Düzenle',
                    'Change Display Name': 'Tercih edilen ismi değiştir',
                    'Save': 'Kaydet',
                    'Cancel': 'İptal',
                    'Account': 'Hesabım',
                    'There are no hoaxes': 'Hoax yok',
                    'There are new hoaxes': 'Yeni hoaxlar var',
                    'Load old hoaxes': 'Eski hoaxları yükle',
                    'Hoax has unknown attachment': 'Hoax dosya tipi desteklenmiyor',
                    'Are you sure to delete hoax?': `Hoax'ı silmek istediğinize emin misiniz?`,
                    'Are you sure to delete your account?': 'Hesabınızı silmek istediğinize emin misiniz?',
                    'Delete Hoax': `Hoax'ı sil`,
                    'Delete Account': 'Hesabı sil',
                    'Delete': 'Sil'

                }
            }
        },
        fallbackLng: 'en',
        ns: ['translation'],
        defaultNS: 'translation',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        }
    });

const timeageTR = (number, index) => {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde'],
    ][index]
}
register('tr', timeageTR)

export default i18n;