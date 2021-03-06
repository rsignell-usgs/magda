{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "fullname" -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "dockerimage" -}}
"{{ .Values.image.repository | default .Values.global.image.repository }}/magda-{{ .Chart.Name }}:{{ .Values.image.tag | default .Values.global.image.tag }}"
{{- end -}}

{{- define "magda.postgres-env" }}
        {{- if .Values.limits }}
        - name: MEMORY_LIMIT
          value: {{ .Values.limits.memory }}
        {{- end }}
        - name: CLIENT_USERNAME
          value: client
        {{- if .Values.global.noDbAuth }}
        - name: CLIENT_PASSWORD
          value: password
        {{- end }}
        {{- if not .Values.global.noDbAuth }}
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-passwords
              key: {{ .Chart.Name }}
        - name: CLIENT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-passwords
              key: {{ .Chart.Name }}-client
        {{- end }}
        {{- if .Values.waleBackup }}
        - name: BACKUP
          value: {{ .Values.waleBackup.method | quote }}
        - name: WALE_S3_PREFIX
          value: {{ .Values.waleBackup.s3Prefix }}
        - name: AWS_ACCESS_KEY_ID
          value: {{ .Values.waleBackup.awsAccessKeyId }}
        - name: AWS_SECRET_ACCESS_KEY
          value: {{ .Values.waleBackup.secretAccessKey }}
        - name: AWS_REGION
          value: {{ .Values.waleBackup.awsRegion }}
        - name: WALE_WABS_PREFIX
          value: {{ .Values.waleBackup.wabsPrefix }}
        - name: WABS_ACCOUNT_NAME
          value: {{ .Values.waleBackup.wabsAccountName }}
        - name: WABS_ACCESS_KEY
          value: {{ .Values.waleBackup.wabsAccessKey }}
        - name: WABS_SAS_TOKEN
          value: {{ .Values.waleBackup.wabsSasToken }}
        - name: WALE_GS_PREFIX
          value: {{ .Values.waleBackup.gsPrefix }}
        {{- if .Values.waleBackup.googleApplicationCreds }}
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: "/var/{{ .Values.waleBackup.googleApplicationCreds.secretName }}/{{ .Values.waleBackup.googleApplicationCreds.fileName }}"
        {{- end }}
        - name: WALE_SWIFT_PREFIX
          value: {{ .Values.waleBackup.swiftPrefix }}
        - name: SWIFT_AUTHURL
          value: {{ .Values.waleBackup.swiftAuthUrl }}
        - name: SWIFT_TENANT
          value: {{ .Values.waleBackup.swiftTenant }}
        - name: SWIFT_USER
          value: {{ .Values.waleBackup.swiftUser }}
        - name: SWIFT_PASSWORD
          value: {{ .Values.waleBackup.swiftPassword }}
        - name: SWIFT_AUTH_VERSION
          value: {{ .Values.waleBackup.swiftAuthVersion }}
        - name: SWIFT_ENDPOINT_TYPE
          value: {{ .Values.waleBackup.swiftEndpointType }}
        - name: BACKUP_EXECUTION_TIME
          value: {{ .Values.waleBackup.executionTime }}
        {{- end }}
{{- end }}

{{- define "magda.waleGoogleStorageCredentials.volumeMount" }}
{{- if and .Values.waleBackup }}
{{- if .Values.waleBackup.googleApplicationCreds }}
        - name: wale-google-account-credentials
          mountPath: "/var/{{ .Values.waleBackup.googleApplicationCreds.secretName }}"
          readOnly: true
{{- end }}
{{- end }}
{{- end }}

{{- define "magda.waleGoogleStorageCredentials.volume" }}
{{- if and .Values.waleBackup }}
{{- if .Values.waleBackup.googleApplicationCreds }}
        - name: wale-google-account-credentials
          secret:
            secretName: {{ .Values.waleBackup.googleApplicationCreds.secretName }}
{{- end }}
{{- end }}
{{- end }}


{{- define "magda.elasticSearchXpackEnv" }}
{{- if .Values.global.noDbAuth }}
        - name: XPACK_ENABLED
          value: "false"
{{- end }}
{{- if not .Values.global.noDbAuth }}
        - name: XPACK_ENABLED
          value: "false"
        - name: ELASTIC_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-passwords
              key: elasticsearch
{{- end }}
{{- end }}