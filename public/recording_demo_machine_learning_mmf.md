---
version: 1.0.0
title: Demo Machine Learning Pipeline - Many Model Forecasting
---

## Pipeline du modele

### Jobs & Pipelines
- timestamp: 1770144004119
- color: #4CAF50
- description: Vue d'ensemble des Jobs & Pipelines Databricks. On y voit les jobs "Sales Forecast Data Preparation" et "Sales Forecast Training".

### Sales Forecast Data Preparation - Job
- timestamp: 1770144007119
- color: #2196F3
- description: Ouverture du job "Sales Forecast Data Preparation" avec les details du job (ID, parametres, notifications, deploiement CI/CD).

### Lineage des tables
- timestamp: 1770144017519
- color: #2196F3
- description: Visualisation du lineage : 4 tables upstream lues par le job et 1 table downstream ecrite (sales_data_for_forecast).

## Prep : construction de la donnee

### Notebook Data Preparation
- timestamp: 1770144025119
- color: #FF9800
- description: Ouverture du notebook "sales_data_for_forecast" montrant le code de preparation des donnees (setup, parametres, creation de la table prd_sales.gold.sales_data_for_forecast).

### Retour Jobs & Pipelines
- timestamp: 1770144036619
- color: #9E9E9E
- description: Retour a la liste des Jobs & Pipelines pour naviguer vers le job d'entrainement.

## Entrainement

### Sales Forecast Training - Job
- timestamp: 1770144043719
- color: #9C27B0
- description: Ouverture du job "Sales Forecast Training" avec les parametres (catalog, model_frequency, model_name) et l'environnement sales_forecast_environment.

### Run details
- timestamp: 1770144050419
- color: #9C27B0
- description: Selection d'un run specifique du job d'entrainement pour voir les details d'execution.

### Notebook Many Model Framework
- timestamp: 1770144058119
- color: #E91E63
- autopause: true
- description: Notebook "Forecasting POC using Many Model Framework" - Entrainement avec MMF sur serverless compute utilisant des modeles locaux (StatsForecast). Configuration des modeles, preparation des donnees hebdomadaires, et execution via run_forecast.

## Metriques repertoriees

### MLflow Experiments
- timestamp: 1770144086719
- color: #FF5722
- description: Navigation vers MLflow. Vue des Experiments, Models et Serving. Le modele "prd_sales.gold.sales_weekly_forecast_model_final" est visible.

### Evaluation et SMAPE
- timestamp: 1770144099419
- color: #FF5722
- autopause: true
- description: Visualisation des metriques d'evaluation. SMAPE (Symmetric Mean Absolute Percentage Error) pour chaque modele et serie temporelle. Selection du meilleur modele base sur le score SMAPE le plus bas.

### Enregistrement du modele
- timestamp: 1770144112519
- color: #795548
- description: Code d'enregistrement du modele dans Unity Catalog via MLflow. Wrapper PythonModel personnalise (StatsForecastModelWrapper) pour le deploiement. Message "Model registered in Unity Catalog - You can now deploy this model to Model Serving".

## Deploiement / Model Serving

### Serving Endpoints
- timestamp: 1770144148919
- color: #00BCD4
- description: Page des Serving Endpoints sur Databricks. Liste des endpoints disponibles.

### Endpoint weekly_forecast
- timestamp: 1770144151219
- color: #00BCD4
- autopause: true
- description: Details de l'endpoint "weekly_forecast" - URL d'invocation, Version 2, tables de lineage (system.serving.endpoint_usage, system.serving.served_entities). Endpoint compatible OpenAI spec.

## Documentation Swagger

### Notebook OpenAPI Swagger
- timestamp: 1770144170319
- color: #3F51B5
- autopause: true
- description: Notebook "openapi_swagger" - Documentation et demo de l'API REST du Model Serving. Recuperation de la specification OpenAPI 3.0 de l'endpoint, affichage du schema de requete/reponse.

### Generation Swagger UI
- timestamp: 1770144182319
- color: #3F51B5
- description: Generation du HTML Swagger UI interactif ("Savencia Sales Forecast API") avec swagger-ui-dist. Sauvegarde du fichier swagger_forecast_api.html pour documentation interactive de l'API.

## Consommation Genie Space

### Navigation Genie
- timestamp: 1770144195919
- color: #4CAF50
- description: Navigation vers l'espace Genie "sales prediction genie". Questions suggerees sur la distribution des ventes, les series temporelles, et les predictions.

### Genie Space - sales prediction genie
- timestamp: 1770144198419
- color: #4CAF50
- autopause: true
- description: Espace Genie "sales prediction genie" connecte a la table prd_sales.gold.sales_overall. Questions suggerees : distribution des ventes par origine (Train vs Predict), statistiques, series temporelles hebdomadaires.

### Question en langage naturel
- timestamp: 1770144206819
- color: #8BC34A
- autopause: true
- description: L'utilisateur pose une question en langage naturel : "Please show a graphic with sales for product Etorki and the prediction from the model, on a line plot". Genie genere la requete SQL et affiche les tendances de ventes avec predictions.