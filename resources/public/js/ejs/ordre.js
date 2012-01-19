<div id="order-detail-acrdion">
	<h3><a href="#">Details</a></h3>
	<div id="order-details">
		<table class="stylecls">
			<thead><tr>
				<th class="styleth">Ordre dato</th>
				<th class="styleth">Status</th>
				<th class="styleth">Instnr</th>
				<th class="styleth">Kunde Id</th>
				<th class="styleth">Address Id</th>
				<th class="styleth">Version</th></tr>
			</thead>
			<tbody><tr>
				<td class="styletd">
				<% if(this.ordredato!=undefined){%>
					<%= ordredato %>
				<% } %>
				</td>
				<td class="styletd">
				<% if(this.status!=undefined){%>
					<%= status %>
				<% } %>
				</td>
				<td class="styletd">
				<% if(this.instnr!=undefined){%>				
					<%= instnr %>
				<% } %>
				</td>
				<td class="styletd">
				<% if(this.kundeid!=undefined){%>
					<%= kundeid %>
				<% } %>
				</td>
				<td class="styletd">
				<% if(this.amsid!=undefined){%>
					<%= amsid %>
				<% } %>
				</td>
				<td class="styletd">
				<% if(this.version!=undefined){%>
					<%= version %>
				<% } %>
				</td></tr>
			</tbody>
		</table>		
	</div>	
</div>
<div id="order-aftaler-acrdion">
	<h3><a href="#">Valgt</a></h3>
	<div id="order-valgt"></div>
	<h3><a href="#">Opsagt</a></h3>
	<div id="order-opsagt"></div>
	<h3><a href="#">Aftaler</a></h3>
	<div id="order-aftaler"></div>
</div>
