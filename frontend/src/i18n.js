import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "Employee Management": "Employee Management",
      "Create Employee": "Create Employee",
      "Name": "Name",
      "CPF": "CPF",
      "Email": "Email",
      "Date of Birth": "Date of Birth",
      "Location": "Location",
      "Position": "Position",
      "Loading...": "Loading...",
      "Failed to fetch employees": "Failed to fetch employees",
      "Employee created successfully!": "Employee created successfully!",
      "Close": "Close",
      "Change to Portuguese": "Change to Portuguese",
      "Change to English": "Change to English",
      "Toggle Dark Mode": "Toggle Dark Mode",
      "Export to Excel" : "Export to Excel",
      "Dark Mode" : "Dark Mode",
      "Actions" : "Actions",
      "No employee records found" : "No employee records found",
      "Employee deleted successfully" : "Employee deleted successfully",
      "Cancel" : "Cancel",
      "Edit Employee" : "Edit Employee",
      "Update Employee" : "Update Employee",
      "Employee edited successfully" : "Employee edited successfully",
      "Edit" : "Edit",
      "Delete" : "Delete"
    }
  },
  pt: {
    translation: {
      "Employee Management": "Gerenciamento de Funcionários",
      "Create Employee": "Criar Funcionário",
      "Name": "Nome",
      "CPF": "CPF",
      "Email": "Email",
      "Date of Birth": "Data de Nascimento",
      "Location": "Localização",
      "Position": "Cargo",
      "Loading...": "Carregando...",
      "Failed to fetch employees": "Falha ao buscar funcionários",
      "Employee created successfully!": "Funcionário criado com sucesso!",
      "Close": "Fechar",
      "Change to Portuguese": "Mudar para Português",
      "Change to English": "Mudar para Inglês",
      "Toggle Dark Mode": "Alternar Modo Escuro",
      "Export to Excel" : "Exportar para Excel",
      "Dark Mode" : "Modo Escuro",
      "Actions" : "Ações",
      "No employee records found" : "Nenhum registro de funcionário encontrado",
      "Employee deleted successfully" : "Funcionário deletado com sucesso",
      "Cancel" : "Cancelar",
      "Edit Employee" : "Editar Funcionário",
      "Update Employee" : "Atualizar Funcionário",
      "Employee edited successfully" : "Funcionário editado com sucesso",
      "Edit" : "Editar",
      "Delete" : "Deletar",
    }
  }
};

const savedLanguage = localStorage.getItem('language') || 'en';


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, 
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
