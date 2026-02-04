---
version: 1
title: Sales Forecast - Machine Learning Pipeline Demo (MMF)
---

## Section: Pipeline du modèle {#pipeline}

### Annotation: Vue d'ensemble des Jobs {#jobs-overview}
---
timestamp: 3900
color: #4CAF50
autopause: true
---

Vue d'ensemble de la page **Jobs & Pipelines** de Databricks. On y retrouve les différents jobs orchestrant le pipeline ML : *Sales Forecast Data Preparation* et *Sales Forecast Training*.

### Annotation: Job de Préparation des Données {#data-prep-job}
---
timestamp: 6800
color: #4CAF50
---

Ouverture du job **Sales Forecast Data Preparation**. Ce job est déclenché automatiquement par *Table Update* lorsqu'une des tables sources change (`dim_customer`, `dim_material`, `dim_sales_org`, `fact_sales_orders`). Il est connecté à Databricks Asset Bundles.

## Section: Prep - Construction de la donnée {#prep}

### Annotation: Notebook de Préparation {#prep-notebook}
---
timestamp: 10400
color: #FF9800
autopause: true
---

Ouverture du notebook de préparation des données (dernier run réussi). Le notebook effectue :
1. **Lecture** des tables de faits (`fact_sales_orders`) et dimensions (`dim_customer`, `dim_material`, `dim_sales_org`)
2. **Jointures** entre les 4 tables
3. **Filtres** : exclusion des clients intra-groupe (code `ZCD4`)
4. **Agrégation** par Date, Organisation commerciale et Produit
5. **Sauvegarde** dans la table `prd_sales.gold.sales_data_for_forecast`

### Annotation: Retour au Job de Préparation {#back-to-prep-job}
---
timestamp: 20000
color: #FF9800
---

Retour à la page du job de préparation avec l'historique des runs.

## Section: Entraînement {#training}

### Annotation: Job d'Entraînement {#training-job}
---
timestamp: 29200
color: #2196F3
autopause: true
---

Ouverture du job **Sales Forecast Training**. Paramètres configurés : produit `ETORKI PORT 250G FAMILIAL X8 FR`, dates `2024-01-01` à `2025-09-01`, fréquence hebdomadaire (`W`), modèle enregistré dans `prd_sales.gold.sales_weekly_forecast_model_final`.

### Annotation: Notebook d'Entraînement MMF {#training-notebook}
---
timestamp: 37500
color: #2196F3
autopause: true
---

Notebook **Forecasting POC using Many Model Framework** (MMF). Ce notebook utilise l'accélérateur Databricks *Many Model Forecasting* pour entraîner et évaluer plusieurs modèles de prévision en parallèle sur compute serverless.

### Annotation: Données d'entraînement {#training-data}
---
timestamp: 40400
color: #2196F3
---

Création de la table d'entraînement hebdomadaire via SQL : agrégation des ventes par semaine pour le produit sélectionné. On obtient **87 semaines** de données historiques.

### Annotation: Sélection des modèles {#model-selection}
---
timestamp: 45700
color: #2196F3
---

Liste des modèles actifs pour l'entraînement :
- `StatsForecastBaselineWindowAverage`
- `StatsForecastBaselineSeasonalWindowAverage`
- `StatsForecastBaselineNaive`
- `StatsForecastBaselineSeasonalNaive`
- `StatsForecastAutoArima`

D'autres modèles sont disponibles mais commentés (AutoETS, AutoTheta, Prophet, etc.).

### Annotation: Lancement de l'entraînement {#run-forecast}
---
timestamp: 54000
color: #2196F3
---

Appel de `run_forecast()` avec les paramètres : horizon de prédiction de 3 semaines, 10 fenêtres de backtest, métrique SMAPE, enregistrement dans MLflow.

## Section: Métriques répertoriées {#metrics}

### Annotation: Résultats d'évaluation {#evaluation-results}
---
timestamp: 63100
color: #9C27B0
autopause: true
---

Table des résultats d'évaluation (`sales_weekly_evaluation_output`) : pour chaque modèle et fenêtre de backtest, on voit la métrique **SMAPE**, les valeurs prédites vs réelles, et le pickle du modèle.

### Annotation: Meilleur modèle et scoring {#best-model}
---
timestamp: 73300
color: #9C27B0
---

Sélection du **meilleur modèle** par SMAPE moyen. Affichage des prédictions de scoring (`sales_weekly_scoring_output`) pour les 3 prochaines semaines.

### Annotation: Enregistrement MLflow {#mlflow-logging}
---
timestamp: 79500
color: #9C27B0
---

Packaging du modèle dans un wrapper `StatsForecastModelWrapper` (compatible MLflow pyfunc). Log du modèle, des métriques (best_smape), des paramètres, et des artefacts (histogramme de variation, graphique de prédiction avec intervalle de confiance Monte Carlo) dans MLflow. Enregistrement dans Unity Catalog.

### Annotation: Expériences MLflow {#mlflow-experiments}
---
timestamp: 104200
color: #9C27B0
autopause: true
---

Page **Experiments** de MLflow. On retrouve l'expérience `sales_weekly_training_final` avec les différents runs d'entraînement.

### Annotation: Comparaison de runs {#run-comparison}
---
timestamp: 120000
color: #9C27B0
---

Comparaison de 2 runs MLflow :
- **StatsForecastAutoArima** : SMAPE = 0.077 (end_date: 2025-08-01)
- **StatsForecastBaselineSeasonalWindowAverage** : SMAPE = 0.032 (end_date: 2025-09-01)

Visualisation via Parallel Coordinates Plot et Scatter Plot.

## Section: Déploiement / Model Serving {#deployment}

### Annotation: Endpoints de Serving {#serving-endpoints}
---
timestamp: 130700
color: #E91E63
autopause: true
---

Page **Serving endpoints** : liste des endpoints disponibles. L'endpoint `weekly_forecast` est en statut **Ready** (version 2), créé par Lucas Bruand.

### Annotation: Création d'un endpoint {#create-endpoint}
---
timestamp: 134900
color: #E91E63
---

Démonstration du flux de création d'un endpoint de serving. Sélection du modèle `prd_sales.gold.sales_weekly_forecast_model_final` depuis Unity Catalog. Configuration : compute Custom avec scale-to-zero, 0-4 concurrency.

### Annotation: Détails de l'endpoint {#endpoint-details}
---
timestamp: 153000
color: #E91E63
---

Dashboard de l'endpoint `weekly_forecast` : métriques de latence (p50, p99), taux de requêtes (QPS), erreurs (4XX/5XX), utilisation CPU et mémoire. URL de l'endpoint : `https://...databricks.com/serving-endpoints/weekly_forecast/invocations`.

### Annotation: OpenAI Spec - Query endpoint {#query-endpoint}
---
timestamp: 152000
color: #E91E63
---

Interface de test de l'endpoint directement depuis le navigateur (Browser/Python).

## Section: Documentation Swagger {#swagger}

### Annotation: Notebook OpenAPI/Swagger {#swagger-notebook}
---
timestamp: 174100
color: #FF5722
autopause: true
---

Notebook **openapi_swagger** démontrant l'intégration API du Model Serving :
1. **Configuration** du endpoint `weekly_forecast`
2. **Authentification** (PAT, OAuth 2.0, Service Principal)
3. **Spécification OpenAPI 3.0** générée automatiquement par l'endpoint
4. **Export** du spec JSON pour Swagger UI / Postman
5. **Documentation interactive** HTML via Swagger UI
6. **Démo d'appel API** pour l'inférence
7. **Exemple cURL** pour accès externe
8. **Référence API** complète (endpoints, authentification, liens)

## Section: Consommation Genie Space {#genie}

### Annotation: Liste des Genie Spaces {#genie-list}
---
timestamp: 203100
color: #00BCD4
autopause: true
---

Page **Genie** : interface de requêtes en langage naturel sur les données. Plusieurs espaces disponibles dont `sales prediction genie`.

### Annotation: Genie Space - Sales Prediction {#genie-space}
---
timestamp: 202600
color: #00BCD4
---

Ouverture du Genie Space **sales prediction genie**. Tables connectées : `sales_overall` et `mapping_timeseries_id_product` (schéma `prd_sales.gold`). Questions suggérées disponibles.

### Annotation: Requête en langage naturel {#genie-query}
---
timestamp: 209800
color: #00BCD4
autopause: true
---

Requête utilisateur : *"Please show a graphic with sales for product Etorki and the prediction from the model, on a line plot. Please differentiate colors for train (actual) and predict."*

Genie recherche les données pertinentes, génère une requête SQL avec jointure entre `sales_overall` et `mapping_timeseries_id_product`, et exécute la requête.

### Annotation: Résultats Genie {#genie-results}
---
timestamp: 218700
color: #00BCD4
---

Genie affiche un **graphique linéaire** avec les ventes historiques (Train) et les prédictions du modèle (Predict) pour le produit ETORKI. Le code SQL généré est visible et vérifiable. Les valeurs prédites (~1.05K-1.15K) prolongent la série temporelle historique.

### Annotation: Fin de la démo {#end}
---
timestamp: 230000
color: #E91E63
autopause: true
---

Fin de la démonstration du pipeline ML complet : de la préparation des données à la consommation via Genie, en passant par l'entraînement, le suivi des métriques, le déploiement et la documentation API.