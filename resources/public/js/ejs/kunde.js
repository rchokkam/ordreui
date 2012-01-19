<div id='kunde-info'>
<table class="stylecls">
	<thead>
		<tr><th class="styleth" colspan='4'>Kunde Information</th></tr>
	</thead>
	<tbody>
		<tr>
			<td class="stylehd">Kunde Id</td><td class="styletd"><%=kundeid %></td>
			<td class="stylehd">Address Id</td><td class="styletd"><%= amsid %></td>
		</tr>
		<tr>
			<td class="stylehd">Kable Type</td><td class="styletd">
			<% if(this.kabeltype!=undefined){%>
				<%= kabeltype %>
			<% } %>
			</td>
			<td class="stylehd">Salgskanal</td><td class="styletd">
			<% if(this.salgskanal!=undefined){%>
				<%= salgskanal %>
			<% } %>
			</td>
		</tr>
		<tr>
			<td class="stylehd">Bolig Type</td><td class="styletd">
			<% if(this.boligtype!=undefined){%>
				<%= boligtype %>
			<% } %>	
			</td>
			<td class="stylehd">Instnr</td><td class="styletd">
			<% if(this.instnr!=undefined){%>
				<%= instnr %>
			<% } %>		
			</td>
		</tr>
		<tr>
			<td class="stylehd">DTV uden clear</td><td class="styletd">
			<% if(this['dtv-uden-clear']!=undefined){%>
				<%= this['dtv-uden-clear'] %>
			<% } %>	
			</td>
			<td class="stylehd">BB uden clear</td><td class="styletd">
			<% if(this['bb-uden-clear']!=undefined){%>
				<%= this['bb-uden-clear'] %>
			<% } %>	
			</td>
		</tr>
		<tr>
			<td class="stylehd">Adresse kreditvalideret</td>
			<td class="styletd">
			<% if(this['adresse-kreditvalideret']!=undefined){%>
				<%= this['adresse-kreditvalideret'] %>
			<% } %>	
			</td>
			<td class="stylehd">Laase</td><td class="styletd">
			<% if(this.laase!=undefined){%>
				<%= laase %>
			<% } %>	
			</td>
		</tr>
		<tr>
			<td class="stylehd">Stikstatus</td><td class="styletd">
			<% if(this.stikstatus!=undefined){%>
				<%= stikstatus %>
			<% } %>	
			</td>
			<td class="stylehd">Anlaegsnr</td><td class="styletd">
			<% if(this.anlaegsnr!=undefined){%>
				<%= anlaegsnr %>
			<% } %>	
			</td>
		</tr>
	</tbody>
</table>
</div>
<div id='kunde-orders'>
	<p>Loading kunde orders ...</p>
</div>